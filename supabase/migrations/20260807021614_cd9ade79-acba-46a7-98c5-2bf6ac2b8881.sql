DROP POLICY IF EXISTS "Clients can update own quotes status" ON public.quotes;

CREATE OR REPLACE FUNCTION public.respond_to_quote(p_quote_id uuid, p_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_owner boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_status NOT IN ('aprovado', 'recusado') THEN
    RAISE EXCEPTION 'Invalid status';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.quotes q
    JOIN public.profiles p ON p.id = q.client_id
    WHERE q.id = p_quote_id AND p.user_id = auth.uid()
  ) INTO v_owner;

  IF NOT v_owner THEN
    RAISE EXCEPTION 'Not allowed';
  END IF;

  UPDATE public.quotes
  SET status = p_status,
      client_response_at = now()
  WHERE id = p_quote_id
    AND status = 'pendente';
END;
$$;

REVOKE ALL ON FUNCTION public.respond_to_quote(uuid, text) FROM public;
GRANT EXECUTE ON FUNCTION public.respond_to_quote(uuid, text) TO authenticated;