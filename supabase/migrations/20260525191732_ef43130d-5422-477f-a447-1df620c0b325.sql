-- Revoke execute from public for all public schema functions by default
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM authenticated;

-- Specifically revoke from public for the functions we identified
REVOKE EXECUTE ON FUNCTION public.get_partner_name(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_partner_client_profile(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_partner_project(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_project_client(uuid, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM PUBLIC;

-- Grant execute back to roles that need it for RLS
GRANT EXECUTE ON FUNCTION public.get_partner_name(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_partner_client_profile(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_partner_project(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_project_client(uuid, uuid) TO authenticated, service_role;

-- handle_new_user is a trigger, only needs service_role/postgres
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- verify_client_credentials should probably be restricted to service_role if it's used in an edge function
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO service_role;

-- Set search_path for all identified functions to public
ALTER FUNCTION public.get_partner_name(uuid) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION public.is_partner_client_profile(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.is_partner_project(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.is_project_client(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.verify_client_credentials(text, text) SET search_path = public;
