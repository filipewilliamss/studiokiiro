ALTER FUNCTION public.get_partner_name(uuid) SET search_path = public;
ALTER FUNCTION public.is_partner_client_profile(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.is_partner_project(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.verify_client_credentials(text, text) SET search_path = public;
ALTER FUNCTION public.is_project_client(uuid, uuid) SET search_path = public;
ALTER FUNCTION public.has_role(uuid, app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;