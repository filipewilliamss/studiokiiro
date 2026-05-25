-- Set search_path and secure sensitive functions

-- 1. Set search_path for all SECURITY DEFINER functions
ALTER FUNCTION public.get_partner_name(uuid) SET search_path = public;
ALTER FUNCTION public.is_partner_client_profile(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.is_partner_project(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.is_project_client(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.verify_client_credentials(text, text) SET search_path = public;

-- 2. Revoke execute on trigger functions from public
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

-- 3. Revoke execute on sensitive credential verification function
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM anon, authenticated;
