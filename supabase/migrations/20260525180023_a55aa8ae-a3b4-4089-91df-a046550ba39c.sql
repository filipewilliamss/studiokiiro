-- Fix critical data exposure in profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
