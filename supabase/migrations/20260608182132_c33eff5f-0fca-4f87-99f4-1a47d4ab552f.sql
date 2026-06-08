-- Revoke default execute permissions from everyone
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.verify_client_credentials(text, text) FROM authenticated;

-- Grant execute permissions specifically to the roles that need it
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO service_role;

-- Ensure search_path is set correctly (already set in definition, but good to reinforce)
ALTER FUNCTION public.verify_client_credentials(text, text) SET search_path = public;