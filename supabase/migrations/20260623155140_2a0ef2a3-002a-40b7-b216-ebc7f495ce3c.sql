-- Remove partner direct SELECT on payments (exposes sensitive cost/margin columns)
DROP POLICY IF EXISTS "Partners can view own sales payments" ON public.payments;

-- Create a partner-safe view exposing ONLY non-sensitive commission fields.
-- security_invoker=off (default) so admins can't bypass column scoping via their own role.
CREATE OR REPLACE VIEW public.partner_payments_view AS
SELECT
  p.id,
  p.project_id,
  p.sale_date,
  p.sales_rep,
  p.commission_amount,
  p.commission_paid_to_partner,
  p.commission_paid_date
FROM public.payments p
WHERE auth_helpers.has_role(auth.uid(), 'partner'::public.app_role)
  AND p.sales_rep = auth_helpers.get_partner_name(auth.uid());

GRANT SELECT ON public.partner_payments_view TO authenticated;
GRANT ALL ON public.partner_payments_view TO service_role;