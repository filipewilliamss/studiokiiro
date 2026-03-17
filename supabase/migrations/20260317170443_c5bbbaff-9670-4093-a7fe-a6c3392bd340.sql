
-- Add commission_paid_to_partner and commission_paid_date to payments
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS commission_paid_to_partner boolean NOT NULL DEFAULT false;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS commission_paid_date date DEFAULT NULL;

-- Add partner_notes to projects (admin writes, partner reads)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS partner_notes text DEFAULT NULL;

-- Helper function to get the partner's name
CREATE OR REPLACE FUNCTION public.get_partner_name(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT full_name FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Partners can view payments for projects they sold
CREATE POLICY "Partners can view own sales payments"
ON public.payments
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'partner'::app_role)
  AND sales_rep = get_partner_name(auth.uid())
);

-- Partners can view projects linked to their sales
CREATE POLICY "Partners can view sold projects"
ON public.projects
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'partner'::app_role)
  AND id IN (
    SELECT project_id FROM public.payments
    WHERE sales_rep = get_partner_name(auth.uid())
  )
);

-- Partners can view project stages for their projects
CREATE POLICY "Partners can view sold project stages"
ON public.project_stages
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'partner'::app_role)
  AND project_id IN (
    SELECT project_id FROM public.payments
    WHERE sales_rep = get_partner_name(auth.uid())
  )
);
