
-- Partners can view profiles (needed to see client names on their projects)
CREATE POLICY "Partners can view profiles for their projects"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'partner'::app_role)
  AND id IN (
    SELECT p.client_id FROM public.projects p
    WHERE p.id IN (
      SELECT pay.project_id FROM public.payments pay
      WHERE pay.sales_rep = get_partner_name(auth.uid())
    )
  )
);
