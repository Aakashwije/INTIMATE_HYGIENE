-- Destructive cleanup: removes customer login accounts and saved profiles.
-- Admin users are preserved when their auth app metadata role is "admin".
-- Existing orders are preserved; their customer_id will be set to null by the FK.

begin;

delete from public.customer_profiles;

delete from auth.users
where aud = 'authenticated'
  and coalesce(raw_app_meta_data ->> 'role', '') <> 'admin';

notify pgrst, 'reload schema';

commit;
