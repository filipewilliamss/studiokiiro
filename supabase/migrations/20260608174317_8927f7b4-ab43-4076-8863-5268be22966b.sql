-- auth_helpers.has_role
REVOKE ALL ON FUNCTION auth_helpers.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- auth_helpers.get_partner_name
REVOKE ALL ON FUNCTION auth_helpers.get_partner_name(uuid) FROM PUBLIC, anon, authenticated;

-- auth_helpers.is_partner_client_profile
REVOKE ALL ON FUNCTION auth_helpers.is_partner_client_profile(uuid, uuid) FROM PUBLIC, anon, authenticated;

-- auth_helpers.is_partner_project
REVOKE ALL ON FUNCTION auth_helpers.is_partner_project(uuid, uuid) FROM PUBLIC, anon, authenticated;

-- auth_helpers.is_project_client
REVOKE ALL ON FUNCTION auth_helpers.is_project_client(uuid, uuid) FROM PUBLIC, anon, authenticated;
