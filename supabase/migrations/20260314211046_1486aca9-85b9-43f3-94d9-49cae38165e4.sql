-- Fix clients: ensure policy is PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage clients" ON clients;
CREATE POLICY "Admins can manage clients" ON clients
  AS PERMISSIVE FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix usage_logs: drop conflicting policies and recreate properly
DROP POLICY IF EXISTS "Allow insert via service role or API" ON usage_logs;
DROP POLICY IF EXISTS "Only admins can insert usage logs" ON usage_logs;

-- Only admins can insert (PERMISSIVE)
CREATE POLICY "Only admins can insert usage logs" ON usage_logs
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));