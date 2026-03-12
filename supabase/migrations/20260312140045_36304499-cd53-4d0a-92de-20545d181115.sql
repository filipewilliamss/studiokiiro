CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS BOOLEAN
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;