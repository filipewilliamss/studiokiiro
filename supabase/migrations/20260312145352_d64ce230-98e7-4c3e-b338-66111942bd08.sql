
-- Payments table for financial tracking
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  budget_total numeric(12,2) NOT NULL DEFAULT 0,
  initial_payment numeric(12,2) DEFAULT 0,
  initial_payment_date date,
  remaining_amount numeric(12,2) DEFAULT 0,
  installments_total integer DEFAULT 1,
  installments_paid integer DEFAULT 0,
  next_payment_date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all payments" ON public.payments
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view own project payments" ON public.payments
FOR SELECT USING (
  project_id IN (
    SELECT p.id FROM projects p
    JOIN profiles pr ON p.client_id = pr.id
    WHERE pr.user_id = auth.uid()
  )
);

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_trigger();

INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', false);

CREATE POLICY "Admins can manage project files" ON storage.objects
FOR ALL USING (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can read own project files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'project-files' AND
  (storage.foldername(name))[1] IN (
    SELECT p.id::text FROM projects p
    JOIN profiles pr ON p.client_id = pr.id
    WHERE pr.user_id = auth.uid()
  )
);
