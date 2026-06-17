CREATE OR REPLACE FUNCTION public.verify_client_credentials(p_username text, p_password text)
 RETURNS TABLE(id uuid, client_name text, role app_role, email text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        cc.id,
        cc.client_name,
        COALESCE(ur.role, 'client'::public.app_role) as role,
        u.email::text
    FROM public.client_credentials cc
    LEFT JOIN public.user_roles ur ON ur.user_id = cc.id
    LEFT JOIN auth.users u ON u.id = cc.id
    WHERE cc.username = p_username 
      AND cc.password = extensions.crypt(p_password, cc.password);
END;
$function$;

CREATE OR REPLACE FUNCTION public.hash_client_password()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' OR (NEW.password <> OLD.password AND NEW.password NOT LIKE '$2a$%' AND NEW.password NOT LIKE '$2b$%') THEN
    NEW.password = extensions.crypt(NEW.password, extensions.gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$function$;