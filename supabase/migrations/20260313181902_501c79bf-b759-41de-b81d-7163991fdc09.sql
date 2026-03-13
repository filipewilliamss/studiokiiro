ALTER TABLE public.service_orders ADD COLUMN IF NOT EXISTS items jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.service_orders ADD COLUMN IF NOT EXISTS deadline date;