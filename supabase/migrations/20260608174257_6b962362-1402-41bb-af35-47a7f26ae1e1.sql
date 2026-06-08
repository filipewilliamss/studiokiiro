-- Revoke default execute from public on all functions in these schemas
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth_helpers REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Secure verify_client_credentials (used for custom login)
-- It should be callable by anon to allow login, but not by authenticated (who should already be logged in)
REVOKE ALL ON FUNCTION public.verify_client_credentials(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO anon;

-- Secure handle_new_user (auth trigger)
-- Should not be callable by users directly
REVOKE ALL ON FUNCTION auth_helpers.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION auth_helpers.handle_new_user() FROM anon, authenticated;

-- Secure helper functions
REVOKE ALL ON FUNCTION auth_helpers.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auth_helpers.has_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION auth_helpers.get_partner_name(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auth_helpers.get_partner_name(uuid) TO authenticated;

REVOKE ALL ON FUNCTION auth_helpers.is_partner_client_profile(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auth_helpers.is_partner_client_profile(uuid, uuid) TO authenticated;

REVOKE ALL ON FUNCTION auth_helpers.is_partner_project(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auth_helpers.is_partner_project(uuid, uuid) TO authenticated;

REVOKE ALL ON FUNCTION auth_helpers.is_project_client(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auth_helpers.is_project_client(uuid, uuid) TO authenticated;
