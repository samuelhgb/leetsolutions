
-- Drop any existing overly permissive INSERT policy on usage_logs
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.usage_logs;
DROP POLICY IF EXISTS "Allow insert for all" ON public.usage_logs;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.usage_logs;

-- Create restrictive INSERT policy: only admins can insert usage logs
CREATE POLICY "Only admins can insert usage logs"
ON public.usage_logs
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));
