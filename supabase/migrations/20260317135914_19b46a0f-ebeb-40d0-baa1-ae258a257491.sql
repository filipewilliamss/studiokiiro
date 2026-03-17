ALTER TABLE public.payments
ADD COLUMN has_commission boolean NOT NULL DEFAULT false,
ADD COLUMN commission_rate numeric NOT NULL DEFAULT 30,
ADD COLUMN commission_amount numeric NOT NULL DEFAULT 0;