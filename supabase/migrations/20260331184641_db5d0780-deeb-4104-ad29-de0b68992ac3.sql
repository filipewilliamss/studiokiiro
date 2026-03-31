-- Create project_feedbacks table
CREATE TABLE IF NOT EXISTS public.project_feedbacks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES public.project_stages(id) ON DELETE SET NULL,
    client_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pendente', -- pendente, revisado, implementado
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_feedbacks ENABLE ROW LEVEL SECURITY;

-- Policies for project_feedbacks
CREATE POLICY "Users can view their own feedbacks" ON public.project_feedbacks FOR SELECT USING (
    auth.uid() = client_id OR 
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin')
);

CREATE POLICY "Clients can create their own feedbacks" ON public.project_feedbacks FOR INSERT WITH CHECK (
    auth.uid() = client_id
);

CREATE POLICY "Admin can update feedbacks" ON public.project_feedbacks FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin')
);

-- Add trigger for updated_at
CREATE TRIGGER update_project_feedbacks_updated_at BEFORE UPDATE ON public.project_feedbacks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
