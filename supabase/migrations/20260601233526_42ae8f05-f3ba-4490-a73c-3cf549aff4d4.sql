
-- Garante extensão para hash de senha
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Sincroniza a senha do admin em auth.users com client_credentials
UPDATE auth.users
SET encrypted_password = crypt('Luara@10', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE id = '748f0aaa-b639-4118-b92f-0e09638c4e60';

-- Recria a função para retornar também o e-mail (para fazer signInWithPassword no cliente)
DROP FUNCTION IF EXISTS public.verify_client_credentials(text, text);

CREATE OR REPLACE FUNCTION public.verify_client_credentials(p_username text, p_password text)
RETURNS TABLE(id uuid, client_name text, role app_role, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
    WHERE cc.username = p_username AND cc.password = p_password;
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_client_credentials(text, text) TO anon, authenticated;
