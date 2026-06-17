GRANT USAGE ON SCHEMA auth_helpers TO authenticated, anon, service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth_helpers TO authenticated, anon, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth_helpers GRANT EXECUTE ON FUNCTIONS TO authenticated, anon, service_role;