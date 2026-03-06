
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  api_key TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'basic',
  monthly_credit_limit INTEGER NOT NULL DEFAULT 500,
  credits_used INTEGER NOT NULL DEFAULT 0,
  last_credit_reset TIMESTAMPTZ NOT NULL DEFAULT now(),
  estimated_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  token_usage INTEGER NOT NULL DEFAULT 0,
  billing_period TEXT DEFAULT 'monthly',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage clients"
  ON public.clients FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Usage logs table
CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  automation_name TEXT NOT NULL,
  credits_consumed INTEGER NOT NULL DEFAULT 0,
  estimated_cost NUMERIC(10,4) NOT NULL DEFAULT 0,
  token_usage INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'success',
  metadata JSONB,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view usage logs"
  ON public.usage_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow insert via service role or API"
  ON public.usage_logs FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Function to generate API key
CREATE OR REPLACE FUNCTION public.generate_api_key()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := 'sk_leet_';
  i INTEGER;
BEGIN
  FOR i IN 1..14 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Function to reset credits monthly
CREATE OR REPLACE FUNCTION public.reset_monthly_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.clients
  SET credits_used = 0,
      estimated_cost = 0,
      last_credit_reset = now(),
      updated_at = now()
  WHERE last_credit_reset < now() - interval '1 month';
END;
$$;

-- Trigger for auto-generating API key on client insert
CREATE OR REPLACE FUNCTION public.auto_generate_api_key()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.api_key IS NULL OR NEW.api_key = '' THEN
    NEW.api_key := public.generate_api_key();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_auto_api_key
  BEFORE INSERT ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_api_key();
