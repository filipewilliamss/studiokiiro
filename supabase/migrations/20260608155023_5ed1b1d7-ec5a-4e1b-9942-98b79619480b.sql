-- 1. Create a private schema for RLS helpers
CREATE SCHEMA IF NOT EXISTS auth_helpers;

-- 2. Drop all policies that depend on the public helper functions
-- Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Partners can view profiles for their projects" ON public.profiles;

-- User Roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Projects
DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;
DROP POLICY IF EXISTS "Clients can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Partners can view sold projects" ON public.projects;

-- Project Stages
DROP POLICY IF EXISTS "Admins can manage all stages" ON public.project_stages;
DROP POLICY IF EXISTS "Clients can view own project stages" ON public.project_stages;
DROP POLICY IF EXISTS "Partners can view sold project stages" ON public.project_stages;

-- Payments
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Clients can view own project payments" ON public.payments;
DROP POLICY IF EXISTS "Partners can view own sales payments" ON public.payments;

-- Storage
DROP POLICY IF EXISTS "Admins can manage project files" ON storage.objects;

-- Messages
DROP POLICY IF EXISTS "Admins can manage all messages" ON public.messages;

-- Briefing Responses
DROP POLICY IF EXISTS "Admins can manage all briefings" ON public.briefing_responses;

-- Quotes
DROP POLICY IF EXISTS "Admins can manage all quotes" ON public.quotes;

-- Service Orders
DROP POLICY IF EXISTS "Admins can manage all service orders" ON public.service_orders;

-- Quote Rejections
DROP POLICY IF EXISTS "Admins can manage all rejections" ON public.quote_rejections;

-- Fixed Costs
DROP POLICY IF EXISTS "Admins can manage fixed costs" ON public.fixed_costs;

-- Service Prices
DROP POLICY IF EXISTS "Admins can manage service prices" ON public.service_prices;

-- Monthly Goals
DROP POLICY IF EXISTS "Admins can manage monthly goals" ON public.monthly_goals;

-- 3. Move/Recreate functions in auth_helpers schema
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
CREATE OR REPLACE FUNCTION auth_helpers.has_role(_user_id uuid, _role public.app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

DROP FUNCTION IF EXISTS public.get_partner_name(uuid);
CREATE OR REPLACE FUNCTION auth_helpers.get_partner_name(_user_id uuid)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT full_name FROM public.profiles WHERE user_id = _user_id LIMIT 1
$function$;

DROP FUNCTION IF EXISTS public.is_partner_client_profile(uuid, uuid);
CREATE OR REPLACE FUNCTION auth_helpers.is_partner_client_profile(_user_id uuid, _profile_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.payments pay ON pay.project_id = p.id
    WHERE p.client_id = _profile_id
      AND pay.sales_rep = auth_helpers.get_partner_name(_user_id)
  );
$function$;

DROP FUNCTION IF EXISTS public.is_partner_project(uuid, uuid);
CREATE OR REPLACE FUNCTION auth_helpers.is_partner_project(_user_id uuid, _project_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.payments pay
    WHERE pay.project_id = _project_id
      AND pay.sales_rep = auth_helpers.get_partner_name(_user_id)
  );
$function$;

DROP FUNCTION IF EXISTS public.is_project_client(uuid, uuid);
CREATE OR REPLACE FUNCTION auth_helpers.is_project_client(_user_id uuid, _project_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.profiles pr ON pr.id = p.client_id
    WHERE p.id = _project_id
      AND pr.user_id = _user_id
  );
$function$;

-- Grant execute on helpers
GRANT USAGE ON SCHEMA auth_helpers TO authenticated, anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth_helpers TO authenticated, anon;

-- 4. Recreate all policies using the new helpers
-- Profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Partners can view profiles for their projects" ON public.profiles FOR SELECT TO authenticated USING (auth_helpers.has_role(auth.uid(), 'partner'::public.app_role) AND auth_helpers.is_partner_client_profile(auth.uid(), id));

-- User Roles
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

-- Projects
CREATE POLICY "Admins can manage all projects" ON public.projects FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Clients can view own projects" ON public.projects FOR SELECT USING (auth_helpers.is_project_client(auth.uid(), id));
CREATE POLICY "Partners can view sold projects" ON public.projects FOR SELECT TO authenticated USING (auth_helpers.has_role(auth.uid(), 'partner'::public.app_role) AND auth_helpers.is_partner_project(auth.uid(), id));

-- Project Stages
CREATE POLICY "Admins can manage all stages" ON public.project_stages FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Clients can view own project stages" ON public.project_stages FOR SELECT USING (auth_helpers.is_project_client(auth.uid(), project_id));
CREATE POLICY "Partners can view sold project stages" ON public.project_stages FOR SELECT TO authenticated USING (auth_helpers.has_role(auth.uid(), 'partner'::public.app_role) AND auth_helpers.is_partner_project(auth.uid(), project_id));

-- Payments
CREATE POLICY "Admins can manage all payments" ON public.payments FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Clients can view own project payments" ON public.payments FOR SELECT USING (auth_helpers.is_project_client(auth.uid(), project_id));
CREATE POLICY "Partners can view own sales payments" ON public.payments FOR SELECT TO authenticated USING (auth_helpers.has_role(auth.uid(), 'partner'::public.app_role) AND (sales_rep = auth_helpers.get_partner_name(auth.uid())));

-- Storage
CREATE POLICY "Admins can manage project files" ON storage.objects FOR ALL USING ((bucket_id = 'project-files'::text) AND auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

-- Other tables with Admin-only access
CREATE POLICY "Admins can manage all messages" ON public.messages FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage all briefings" ON public.briefing_responses FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage all quotes" ON public.quotes FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage all service orders" ON public.service_orders FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage all rejections" ON public.quote_rejections FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage fixed costs" ON public.fixed_costs FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage service prices" ON public.service_prices FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage monthly goals" ON public.monthly_goals FOR ALL USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

-- 5. Secure client_credentials with hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Hash existing passwords that aren't already hashed
UPDATE public.client_credentials
SET password = crypt(password, gen_salt('bf'))
WHERE password NOT LIKE '$2a$%' AND password NOT LIKE '$2b$%';

-- Add trigger for automatic hashing
CREATE OR REPLACE FUNCTION public.hash_client_password()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (NEW.password <> OLD.password AND NEW.password NOT LIKE '$2a$%' AND NEW.password NOT LIKE '$2b$%') THEN
    NEW.password = crypt(NEW.password, gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_hash_client_password ON public.client_credentials;
CREATE TRIGGER tr_hash_client_password
BEFORE INSERT OR UPDATE ON public.client_credentials
FOR EACH ROW EXECUTE FUNCTION public.hash_client_password();

-- 6. Harden verify_client_credentials
CREATE OR REPLACE FUNCTION public.verify_client_credentials(p_username text, p_password text)
 RETURNS TABLE(id uuid, client_name text, role public.app_role, email text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        cc.id,
        cc.client_name,
        COALESCE(ur.role, 'client'::public.app_role) as role,
        u.email::text
    FROM public.client_credentials cc
    LEFT JOIN public.user_roles ur ON ur.user_id = cc.id
    LEFT JOIN auth.users u ON u.id = cc.id
    WHERE cc.username = p_username 
      AND cc.password = crypt(p_password, cc.password);
END;
$function$;

GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO anon, authenticated;
