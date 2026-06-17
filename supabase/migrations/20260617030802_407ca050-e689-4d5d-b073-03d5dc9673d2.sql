
-- Fix 1: Restrict service_goals SELECT to admins only
DROP POLICY IF EXISTS "Others can view service_goals" ON public.service_goals;

CREATE POLICY "Admins can view service_goals"
ON public.service_goals
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role::text = 'admin'
  )
);

-- Fix 2: Add RLS on realtime.messages to scope Realtime subscriptions
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated postgres_changes only" ON realtime.messages;
CREATE POLICY "Authenticated postgres_changes only"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  extension = 'postgres_changes'
);
