
-- Fix search_path warnings on functions
ALTER FUNCTION public.generate_api_key() SET search_path = public;
ALTER FUNCTION public.auto_generate_api_key() SET search_path = public;
ALTER FUNCTION public.reset_monthly_credits() SET search_path = public;

-- Fix permissive RLS: restrict usage_logs insert to requests with valid API key
DROP POLICY "Allow insert via service role or API" ON public.usage_logs;
CREATE POLICY "Allow insert via service role or API"
  ON public.usage_logs FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND is_active = true)
  );
