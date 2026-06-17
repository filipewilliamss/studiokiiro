DROP POLICY IF EXISTS "Partners can view their own goals" ON public.partner_goals;

CREATE POLICY "Partners can view their own goals"
ON public.partner_goals
FOR SELECT
TO authenticated
USING (
  partner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);