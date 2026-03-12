
-- Messages table for client-admin chat per project
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage all messages"
ON public.messages FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Clients can view messages of their own projects
CREATE POLICY "Clients can view own project messages"
ON public.messages FOR SELECT
TO authenticated
USING (
  project_id IN (
    SELECT p.id FROM projects p
    JOIN profiles pr ON p.client_id = pr.id
    WHERE pr.user_id = auth.uid()
  )
);

-- Clients can insert messages in their own projects
CREATE POLICY "Clients can send messages in own projects"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (
  sender_id = auth.uid() AND
  project_id IN (
    SELECT p.id FROM projects p
    JOIN profiles pr ON p.client_id = pr.id
    WHERE pr.user_id = auth.uid()
  )
);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
