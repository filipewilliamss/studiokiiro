-- Revoke execute from public for trigger functions
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_trigger() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC;

-- Set search_path for trigger functions
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.update_updated_at_trigger() SET search_path = public;
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Grant execute to service_role (standard for triggers)
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_trigger() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;
