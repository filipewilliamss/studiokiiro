-- Move handle_new_user to auth_helpers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION auth_helpers.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$function$;

-- Grant execute on the trigger function to the service_role (used by auth triggers)
GRANT EXECUTE ON FUNCTION auth_helpers.handle_new_user() TO service_role;

-- Recreate trigger on auth.users (requires superuser or bypass, but in Supabase migration tool it works)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION auth_helpers.handle_new_user();

-- Remove the old one from public
DROP FUNCTION IF EXISTS public.handle_new_user();
