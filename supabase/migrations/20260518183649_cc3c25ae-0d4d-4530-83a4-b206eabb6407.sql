-- Drop the existing function first because we are changing the return type
DROP FUNCTION IF EXISTS public.verify_client_credentials(text, text);

CREATE OR REPLACE FUNCTION public.verify_client_credentials(p_username text, p_password text)
RETURNS TABLE (id uuid, client_name text, role public.app_role) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cc.id, 
        cc.client_name,
        COALESCE(ur.role, 'client'::public.app_role) as role
    FROM public.client_credentials cc
    LEFT JOIN public.user_roles ur ON ur.user_id = cc.id
    WHERE cc.username = p_username AND cc.password = p_password;
END;
$$;