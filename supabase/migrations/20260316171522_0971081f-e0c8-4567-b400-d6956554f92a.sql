
-- Add admin_confirmed column to quotes table
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS admin_confirmed boolean NOT NULL DEFAULT false;

-- Create quote_rejections table for feedback
CREATE TABLE public.quote_rejections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  decision_factor text,
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_rejections ENABLE ROW LEVEL SECURITY;

-- Admin can manage all rejections
CREATE POLICY "Admins can manage all rejections"
ON public.quote_rejections
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Clients can insert their own rejections
CREATE POLICY "Clients can insert own rejections"
ON public.quote_rejections
FOR INSERT
TO authenticated
WITH CHECK (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Clients can view own rejections
CREATE POLICY "Clients can view own rejections"
ON public.quote_rejections
FOR SELECT
TO authenticated
USING (client_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));
