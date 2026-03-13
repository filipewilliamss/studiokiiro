
-- Quotes table
CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequential_number serial NOT NULL,
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_type text NOT NULL DEFAULT 'Identidade Visual',
  description text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_value numeric NOT NULL DEFAULT 0,
  payment_terms text,
  validity_date date,
  status text NOT NULL DEFAULT 'pendente',
  client_response_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all quotes" ON public.quotes FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Clients can view own quotes" ON public.quotes FOR SELECT TO authenticated
  USING (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Clients can update own quotes status" ON public.quotes FOR UPDATE TO authenticated
  USING (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  WITH CHECK (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Service Orders table
CREATE TABLE public.service_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequential_number serial NOT NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type text NOT NULL DEFAULT 'Identidade Visual',
  description text,
  total_value numeric NOT NULL DEFAULT 0,
  payment_terms text,
  terms_conditions text,
  notes text,
  status text NOT NULL DEFAULT 'ativa',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all service orders" ON public.service_orders FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Clients can view own service orders" ON public.service_orders FOR SELECT TO authenticated
  USING (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));
