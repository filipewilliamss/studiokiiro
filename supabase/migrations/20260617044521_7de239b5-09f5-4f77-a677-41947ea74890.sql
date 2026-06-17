-- 1) PROFILES: remove direct partner read access; expose only id + full_name via a security-definer view

DROP POLICY IF EXISTS "Partners can view profiles for their projects" ON public.profiles;

CREATE OR REPLACE VIEW public.partner_client_names
WITH (security_invoker = off) AS
SELECT p.id, p.full_name, p.company
FROM public.profiles p
WHERE auth_helpers.has_role(auth.uid(), 'partner'::public.app_role)
  AND auth_helpers.is_partner_client_profile(auth.uid(), p.id);

GRANT SELECT ON public.partner_client_names TO authenticated;

-- 2) PAYMENTS: remove client direct SELECT; expose only safe columns via a security-definer view

DROP POLICY IF EXISTS "Clients can view own project payments" ON public.payments;

CREATE OR REPLACE VIEW public.client_payments_view
WITH (security_invoker = off) AS
SELECT
  id,
  project_id,
  budget_total,
  initial_payment,
  initial_payment_date,
  remaining_amount,
  installments_total,
  installments_paid,
  next_payment_date,
  sale_date,
  payment_method,
  payment_status,
  created_at,
  updated_at
FROM public.payments
WHERE auth_helpers.is_project_client(auth.uid(), project_id);

GRANT SELECT ON public.client_payments_view TO authenticated;