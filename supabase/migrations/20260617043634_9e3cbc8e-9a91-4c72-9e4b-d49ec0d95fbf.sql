CREATE POLICY "Admins can view all project feedbacks"
ON public.project_feedbacks
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin'));

CREATE POLICY "Admins can delete project feedbacks"
ON public.project_feedbacks
FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text = 'admin'));