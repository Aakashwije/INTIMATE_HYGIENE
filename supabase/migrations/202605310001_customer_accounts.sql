create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  phone text,
  address text,
  city text,
  preferred_payment_method text not null default 'Cash on Delivery',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.customer_profiles enable row level security;

alter table public.customer_profiles add column if not exists preferred_payment_method text not null default 'Cash on Delivery';
alter table public.customer_profiles add column if not exists updated_at timestamptz default now();
alter table public.orders add column if not exists customer_id uuid references auth.users(id) on delete set null;

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

drop policy if exists "Customers can read own profile" on public.customer_profiles;
create policy "Customers can read own profile"
on public.customer_profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Customers can create own profile" on public.customer_profiles;
create policy "Customers can create own profile"
on public.customer_profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Customers can update own profile" on public.customer_profiles;
create policy "Customers can update own profile"
on public.customer_profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Customers can read own orders" on public.orders;
create policy "Customers can read own orders"
on public.orders
for select
to authenticated
using (customer_id = auth.uid());

drop policy if exists "Customers can read own order items" on public.order_items;
create policy "Customers can read own order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.customer_id = auth.uid()
  )
);

drop policy if exists "Admin ui can read customer profiles" on public.customer_profiles;
create policy "Admin ui can read customer profiles"
on public.customer_profiles
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
