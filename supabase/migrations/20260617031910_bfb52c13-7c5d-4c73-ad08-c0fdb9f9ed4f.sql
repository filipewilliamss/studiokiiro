
-- 1) client_credentials: restrict admin ALL policy to authenticated role only (was {public})
DROP POLICY IF EXISTS "Admins can manage client credentials" ON public.client_credentials;
CREATE POLICY "Admins can manage client credentials"
ON public.client_credentials
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can manage client credentials (permissive)"
ON public.client_credentials
FOR ALL
TO authenticated
USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE ALL ON public.client_credentials FROM anon;

-- 2) service_prices: restrict admin ALL policy to authenticated role only (was {public})
DROP POLICY IF EXISTS "Admins can manage service prices" ON public.service_prices;
CREATE POLICY "Admins can manage service prices"
ON public.service_prices
FOR ALL
TO authenticated
USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE ALL ON public.service_prices FROM anon;

-- 3) realtime.messages: scope channel subscriptions by project membership
DROP POLICY IF EXISTS "Authenticated postgres_changes only" ON realtime.messages;

CREATE POLICY "Realtime channel access scoped by project membership"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  extension = 'postgres_changes'
  AND (
    -- Admins: full access (including admin-messages-* topics)
    auth_helpers.has_role(auth.uid(), 'admin'::public.app_role)
    OR
    -- Clients: only their own project channel topic `messages-{project_id}`
    (
      topic LIKE 'messages-%'
      AND EXISTS (
        SELECT 1
        FROM public.projects p
        JOIN public.profiles pr ON pr.id = p.client_id
        WHERE pr.user_id = auth.uid()
          AND p.id::text = substring(topic from 10)
      )
    )
  )
);
