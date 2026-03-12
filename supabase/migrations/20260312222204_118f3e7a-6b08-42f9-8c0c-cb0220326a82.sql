
-- Table to store briefing responses per project
CREATE TABLE public.briefing_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id)
);

ALTER TABLE public.briefing_responses ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage all briefings"
  ON public.briefing_responses FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Clients can insert their own project briefings
CREATE POLICY "Clients can submit own project briefings"
  ON public.briefing_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN profiles pr ON p.client_id = pr.id
      WHERE pr.user_id = auth.uid()
    )
  );

-- Clients can view own project briefings
CREATE POLICY "Clients can view own project briefings"
  ON public.briefing_responses FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN profiles pr ON p.client_id = pr.id
      WHERE pr.user_id = auth.uid()
    )
  );
