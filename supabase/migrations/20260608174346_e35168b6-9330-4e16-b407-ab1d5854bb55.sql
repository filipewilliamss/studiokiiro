-- hash_client_password (trigger function)
REVOKE ALL ON FUNCTION public.hash_client_password() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.hash_client_password() FROM anon, authenticated;
