grant usage on schema public to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant insert on public.order_items to anon, authenticated;
grant insert on public.site_events to anon, authenticated;
grant select on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select, insert, update on public.customer_profiles to authenticated;

drop policy if exists "Anyone can create order" on public.orders;
create policy "Anyone can create order"
on public.orders
for insert
to anon, authenticated
with check (
  customer_id is null
  or customer_id = auth.uid()
  or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Anyone can create order items" on public.order_items;
create policy "Anyone can create order items"
on public.order_items
for insert
to anon, authenticated
with check (true);

create or replace function public.create_checkout_order(
  order_payload jsonb,
  item_payloads jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_customer_id uuid;
  safe_customer_id uuid;
  inserted_order_id uuid;
  inserted_order_ref text;
begin
  if nullif(order_payload ->> 'customer_id', '') is not null then
    requested_customer_id := (order_payload ->> 'customer_id')::uuid;
  end if;

  if auth.uid() is not null and requested_customer_id = auth.uid() then
    safe_customer_id := requested_customer_id;
  else
    safe_customer_id := null;
  end if;

  insert into public.orders (
    id,
    customer_id,
    order_ref,
    customer_name,
    customer_email,
    customer_phone,
    address,
    city,
    total,
    status,
    payment_method,
    discount_code,
    note
  )
  values (
    coalesce((nullif(order_payload ->> 'id', ''))::uuid, gen_random_uuid()),
    safe_customer_id,
    nullif(order_payload ->> 'order_ref', ''),
    coalesce(nullif(order_payload ->> 'customer_name', ''), 'Customer'),
    nullif(order_payload ->> 'customer_email', ''),
    coalesce(nullif(order_payload ->> 'customer_phone', ''), 'Not provided'),
    coalesce(nullif(order_payload ->> 'address', ''), 'Not provided'),
    nullif(order_payload ->> 'city', ''),
    coalesce((nullif(order_payload ->> 'total', ''))::numeric, 0),
    coalesce(nullif(order_payload ->> 'status', ''), 'pending'),
    nullif(order_payload ->> 'payment_method', ''),
    nullif(order_payload ->> 'discount_code', ''),
    nullif(order_payload ->> 'note', '')
  )
  returning id, order_ref into inserted_order_id, inserted_order_ref;

  insert into public.order_items (
    order_id,
    product_name,
    quantity,
    price
  )
  select
    inserted_order_id,
    coalesce(nullif(item ->> 'product_name', ''), 'Product'),
    greatest(coalesce((nullif(item ->> 'quantity', ''))::integer, 1), 1),
    coalesce((nullif(item ->> 'price', ''))::numeric, 0)
  from jsonb_array_elements(item_payloads) as item;

  return jsonb_build_object(
    'id', inserted_order_id,
    'order_ref', inserted_order_ref,
    'sync_status', 'cloud'
  );
end;
$$;

grant execute on function public.create_checkout_order(jsonb, jsonb) to anon, authenticated;

create or replace function public.save_customer_profile(profile_payload jsonb)
returns public.customer_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_profile public.customer_profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required to save customer profile.';
  end if;

  insert into public.customer_profiles (
    id,
    email,
    name,
    phone,
    address,
    city,
    preferred_payment_method,
    updated_at
  )
  values (
    auth.uid(),
    nullif(profile_payload ->> 'email', ''),
    coalesce(profile_payload ->> 'name', ''),
    coalesce(profile_payload ->> 'phone', ''),
    coalesce(profile_payload ->> 'address', ''),
    coalesce(profile_payload ->> 'city', ''),
    coalesce(nullif(profile_payload ->> 'preferred_payment_method', ''), 'Cash on Delivery'),
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    name = excluded.name,
    phone = excluded.phone,
    address = excluded.address,
    city = excluded.city,
    preferred_payment_method = excluded.preferred_payment_method,
    updated_at = now()
  returning * into saved_profile;

  return saved_profile;
end;
$$;

grant execute on function public.save_customer_profile(jsonb) to authenticated;

notify pgrst, 'reload schema';
