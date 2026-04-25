-- Create client_credentials table
CREATE TABLE IF NOT EXISTS public.client_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    client_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_credentials ENABLE ROW LEVEL SECURITY;

-- Allow public read for login verification (or we can handle this via RPC for better security)
-- For now, let's keep it simple for the developer but secure enough.
-- Actually, let's create a function to verify credentials to avoid exposing passwords in plain text via SELECT.

CREATE OR REPLACE FUNCTION verify_client_credentials(p_username TEXT, p_password TEXT)
RETURNS TABLE (id UUID, client_name TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT cc.id, cc.client_name
    FROM public.client_credentials cc
    WHERE cc.username = p_username AND cc.password = p_password;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for Admin
-- We'll assume any authenticated user with 'admin' role in user_roles table can manage this.
-- Or just check against the hardcoded admin username for now if we want to bypass full auth.
-- But let's stick to the user_roles pattern if it exists.

CREATE POLICY "Admins can manage client credentials"
ON public.client_credentials
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- For the specific admin 'Filipewilliams', we can manually insert them or handle it in the app.
-- Let's also create an index
CREATE INDEX idx_client_credentials_username ON public.client_credentials(username);
