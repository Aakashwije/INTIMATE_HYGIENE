grant usage on schema public to anon, authenticated;
grant select, insert, update on public.customer_profiles to authenticated;
grant select on public.orders to authenticated;
grant select on public.order_items to authenticated;

notify pgrst, 'reload schema';
