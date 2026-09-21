CREATE TABLE IF NOT EXISTS public.briefing_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
  submitted_at TIMESTAMPTZ,
  revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.briefing_links TO authenticated;
GRANT ALL ON public.briefing_links TO service_role;

ALTER TABLE public.briefing_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage briefing links" ON public.briefing_links;
CREATE POLICY "Admins manage briefing links" ON public.briefing_links
  FOR ALL TO authenticated
  USING (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (auth_helpers.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.create_briefing_link_for_project()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  INSERT INTO public.briefing_links (project_id) VALUES (NEW.id)
  ON CONFLICT (project_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_create_briefing_link ON public.projects;
CREATE TRIGGER trg_create_briefing_link
AFTER INSERT ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.create_briefing_link_for_project();

INSERT INTO public.briefing_links (project_id, submitted_at)
SELECT p.id,
       CASE WHEN EXISTS (SELECT 1 FROM public.briefing_responses br WHERE br.project_id = p.id) THEN now() ELSE NULL END
FROM public.projects p
ON CONFLICT (project_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.get_briefing_by_token(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v JSONB;
BEGIN
  SELECT jsonb_build_object(
           'project_name', p.name,
           'project_type', p.type,
           'client_name', pr.full_name,
           'company', pr.company,
           'submitted', (bl.submitted_at IS NOT NULL OR EXISTS (SELECT 1 FROM public.briefing_responses br WHERE br.project_id = p.id))
         )
    INTO v
  FROM public.briefing_links bl
  JOIN public.projects p ON p.id = bl.project_id
  JOIN public.profiles pr ON pr.id = p.client_id
  WHERE bl.token = p_token AND bl.revoked = false;

  IF v IS NULL THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;
  RETURN v;
END;
$$;

REVOKE ALL ON FUNCTION public.get_briefing_by_token(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_briefing_by_token(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.submit_briefing_by_token(p_token TEXT, p_responses JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_link public.briefing_links;
BEGIN
  SELECT * INTO v_link FROM public.briefing_links
  WHERE token = p_token AND revoked = false;

  IF v_link.id IS NULL THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;

  IF v_link.submitted_at IS NOT NULL
     OR EXISTS (SELECT 1 FROM public.briefing_responses br WHERE br.project_id = v_link.project_id) THEN
    RETURN jsonb_build_object('error', 'already_submitted');
  END IF;

  IF p_responses IS NULL OR jsonb_typeof(p_responses) <> 'object' THEN
    RETURN jsonb_build_object('error', 'invalid_payload');
  END IF;

  INSERT INTO public.briefing_responses (project_id, responses)
  VALUES (v_link.project_id, p_responses);

  UPDATE public.briefing_links SET submitted_at = now() WHERE id = v_link.id;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE ALL ON FUNCTION public.submit_briefing_by_token(TEXT, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_briefing_by_token(TEXT, JSONB) TO anon, authenticated;