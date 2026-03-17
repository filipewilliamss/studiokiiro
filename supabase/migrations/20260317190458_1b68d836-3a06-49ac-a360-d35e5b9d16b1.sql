-- Fix recursive RLS evaluation between projects/payments/profiles policies
-- by moving cross-table checks into SECURITY DEFINER helper functions.

CREATE OR REPLACE FUNCTION public.is_project_client(_user_id uuid, _project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.profiles pr ON pr.id = p.client_id
    WHERE p.id = _project_id
      AND pr.user_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_partner_project(_user_id uuid, _project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.payments pay
    WHERE pay.project_id = _project_id
      AND pay.sales_rep = public.get_partner_name(_user_id)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_partner_client_profile(_user_id uuid, _profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.payments pay ON pay.project_id = p.id
    WHERE p.client_id = _profile_id
      AND pay.sales_rep = public.get_partner_name(_user_id)
  );
$$;

ALTER POLICY "Clients can view own projects"
ON public.projects
USING (public.is_project_client(auth.uid(), id));

ALTER POLICY "Partners can view sold projects"
ON public.projects
USING (
  public.has_role(auth.uid(), 'partner'::public.app_role)
  AND public.is_partner_project(auth.uid(), id)
);

ALTER POLICY "Clients can view own project payments"
ON public.payments
USING (public.is_project_client(auth.uid(), project_id));

ALTER POLICY "Partners can view own sales payments"
ON public.payments
USING (
  public.has_role(auth.uid(), 'partner'::public.app_role)
  AND sales_rep = public.get_partner_name(auth.uid())
);

ALTER POLICY "Clients can view own project stages"
ON public.project_stages
USING (public.is_project_client(auth.uid(), project_id));

ALTER POLICY "Partners can view sold project stages"
ON public.project_stages
USING (
  public.has_role(auth.uid(), 'partner'::public.app_role)
  AND public.is_partner_project(auth.uid(), project_id)
);

ALTER POLICY "Partners can view profiles for their projects"
ON public.profiles
USING (
  public.has_role(auth.uid(), 'partner'::public.app_role)
  AND public.is_partner_client_profile(auth.uid(), id)
);