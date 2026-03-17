
-- Fixed monthly costs table
CREATE TABLE public.fixed_costs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fixed_costs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage fixed costs"
ON public.fixed_costs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default fixed costs
INSERT INTO public.fixed_costs (name, value, sort_order) VALUES
  ('Internet', 100.00, 1),
  ('Telefone móvel', 65.00, 2),
  ('Adobe Creative Cloud', 124.90, 3),
  ('Domínio + e-mail profissional', 30.00, 4),
  ('Ferramentas extras', 15.00, 5),
  ('Energia elétrica', 150.00, 6),
  ('Equipamentos (depreciação)', 150.00, 7),
  ('Marketing próprio', 80.00, 8),
  ('Custos CNPJ', 280.00, 9),
  ('IAs e bancos de imagem/vídeo', 60.00, 10);

-- Service prices table
CREATE TABLE public.service_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  current_price numeric NOT NULL DEFAULT 0,
  target_price numeric NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.service_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage service prices"
ON public.service_prices FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default service prices
INSERT INTO public.service_prices (category, name, current_price, target_price, sort_order) VALUES
  ('Identidade Visual', 'Logotipo Essencial', 1100.00, 1500.00, 1),
  ('Identidade Visual', 'Identidade Visual', 1650.00, 2350.00, 2),
  ('Identidade Visual', 'Branding Completo', 2250.00, 3250.00, 3),
  ('Identidade Visual', 'Manual do Logotipo (avulso)', 825.00, 1100.00, 4),
  ('Identidade Visual', 'Personal Brand Kit', 1350.00, 2000.00, 5),
  ('Design de Conteúdo — Redes Sociais', 'Pacote Pontual (10 peças)', 400.00, 700.00, 6),
  ('Design de Conteúdo — Redes Sociais', 'Retainer Mensal (12–16 peças)', 900.00, 1400.00, 7),
  ('Edição de Vídeo', 'Reels / Shorts (até 60s) — unitário', 100.00, 200.00, 8),
  ('Edição de Vídeo', 'Pacote 4 vídeos/mês', 350.00, 700.00, 9),
  ('Edição de Vídeo', 'Vídeo Institucional (2–5min)', 500.00, 1000.00, 10),
  ('Edição de Vídeo', 'Tutorial / Educativo (até 15min)', 425.00, 850.00, 11),
  ('Sites e Landing Pages', 'Landing Page Simples (até 6 seções)', 1050.00, 1650.00, 12),
  ('Sites e Landing Pages', 'Landing Page Completa (até 12 seções)', 1650.00, 2250.00, 13),
  ('Sites e Landing Pages', 'Site Institucional (3–5 páginas)', 2000.00, 2750.00, 14),
  ('Sites e Landing Pages', 'Site Completo (5–8 páginas)', 2750.00, 4000.00, 15);

-- Monthly goals table
CREATE TABLE public.monthly_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL UNIQUE, -- format: YYYY-MM
  revenue_goal numeric NOT NULL DEFAULT 0,
  profit_goal numeric NOT NULL DEFAULT 0,
  tax_rate numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.monthly_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage monthly goals"
ON public.monthly_goals FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add new columns to payments table
ALTER TABLE public.payments
ADD COLUMN sale_date date DEFAULT CURRENT_DATE,
ADD COLUMN payment_method text DEFAULT 'PIX',
ADD COLUMN sales_rep text DEFAULT '',
ADD COLUMN freelancer_cost numeric DEFAULT 0,
ADD COLUMN other_costs numeric DEFAULT 0,
ADD COLUMN payment_fees_pct numeric DEFAULT 0,
ADD COLUMN payment_fees_amount numeric DEFAULT 0,
ADD COLUMN payment_status text DEFAULT 'pendente',
ADD COLUMN service_price_id uuid REFERENCES public.service_prices(id);
