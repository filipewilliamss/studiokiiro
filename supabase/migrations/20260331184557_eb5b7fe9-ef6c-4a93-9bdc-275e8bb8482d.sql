-- Create a proper trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add sub_status and estimated_margin to quotes
ALTER TABLE public.quotes 
ADD COLUMN IF NOT EXISTS sub_status TEXT DEFAULT 'Enviada',
ADD COLUMN IF NOT EXISTS estimated_margin DECIMAL(10,2);

-- Add studio_observation and health_status to projects
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS studio_observation TEXT,
ADD COLUMN IF NOT EXISTS health_status TEXT DEFAULT 'No Prazo',
ADD COLUMN IF NOT EXISTS partner_message TEXT;

-- Add internal_tasks to project_stages (as JSONB array of objects {id, text, completed})
ALTER TABLE public.project_stages 
ADD COLUMN IF NOT EXISTS internal_tasks JSONB DEFAULT '[]'::jsonb;

-- Create table for service goals
CREATE TABLE IF NOT EXISTS public.service_goals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL, -- YYYY-MM
    service_type TEXT NOT NULL,
    goal_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(month, service_type)
);

-- Create table for partner goals
CREATE TABLE IF NOT EXISTS public.partner_goals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL, -- YYYY-MM
    partner_id UUID NOT NULL REFERENCES auth.users(id),
    goal_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(month, partner_id)
);

-- Enable RLS
ALTER TABLE public.service_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_goals ENABLE ROW LEVEL SECURITY;

-- Policies for service_goals
CREATE POLICY "Admin can do everything on service_goals" ON public.service_goals FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin')
);
CREATE POLICY "Others can view service_goals" ON public.service_goals FOR SELECT USING (true);

-- Policies for partner_goals
CREATE POLICY "Admin can do everything on partner_goals" ON public.partner_goals FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin')
);
CREATE POLICY "Partners can view their own goals" ON public.partner_goals FOR SELECT USING (
    auth.uid() = partner_id
);

-- Add triggers for updated_at
CREATE TRIGGER update_service_goals_updated_at BEFORE UPDATE ON public.service_goals FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_partner_goals_updated_at BEFORE UPDATE ON public.partner_goals FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
