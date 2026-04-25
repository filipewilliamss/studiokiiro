ALTER FUNCTION verify_client_credentials(TEXT, TEXT) SET search_path = public;

-- Enable password hibp (was one of the warnings)
-- This is a configuration change, not SQL, but I can use it to acknowledge the warning.
-- Actually, the linter mentioned it. I'll just fix the function for now.
