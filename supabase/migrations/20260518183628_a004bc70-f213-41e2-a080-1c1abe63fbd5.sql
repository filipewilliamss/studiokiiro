INSERT INTO public.client_credentials (id, username, password, client_name)
VALUES ('748f0aaa-b639-4118-b92f-0e09638c4e60', 'filipewilliams', 'Luara@10', 'Filipe Williams')
ON CONFLICT (id) DO UPDATE SET password = 'Luara@10';