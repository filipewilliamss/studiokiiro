-- Drop the old client policy and recreate with simpler path matching
DROP POLICY IF EXISTS "Clients can read own project files" ON storage.objects;

CREATE POLICY "Clients can read own project files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'project-files'
  AND (SPLIT_PART(name, '/', 1))::uuid IN (
    SELECT p.id
    FROM public.projects p
    JOIN public.profiles pr ON p.client_id = pr.id
    WHERE pr.user_id = auth.uid()
  )
);