-- Fix Search Path for SECURITY DEFINER functions
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.verify_client_credentials(text, text) SET search_path = public;

-- Also set for helpers just in case (though already done in previous migration)
ALTER FUNCTION auth_helpers.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION auth_helpers.get_partner_name(uuid) SET search_path = public;
ALTER FUNCTION auth_helpers.is_partner_client_profile(uuid, uuid) SET search_path = public;
ALTER FUNCTION auth_helpers.is_partner_project(uuid, uuid) SET search_path = public;
ALTER FUNCTION auth_helpers.is_project_client(uuid, uuid) SET search_path = public;

-- Set search path for trigger functions (best practice)
ALTER FUNCTION public.hash_client_password() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.update_updated_at_trigger() SET search_path = public;
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Clean up verify_client_credentials permissions to be explicit
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO anon, authenticated, service_role;
