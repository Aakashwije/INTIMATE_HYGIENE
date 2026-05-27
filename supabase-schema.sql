create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  company text,
  name text not null,
  email text,
  phone text,
  subject text,
  product text,
  volume text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  cost numeric(10,2) not null default 0,
  sku text,
  image_url text,
  min_order integer not null default 1,
  stock integer not null default 0,
  sold integer not null default 0,
  rating numeric(2,1) not null default 4.9,
  reviews integer not null default 0,
  category text not null default 'Retail',
  price_note text,
  badge text,
  urgency text,
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text unique,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  address text not null,
  city text,
  total numeric(10,2) not null,
  status text not null default 'pending',
  payment_method text,
  discount_code text,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  price numeric(10,2) not null,
  created_at timestamptz default now()
);

create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  answers jsonb not null,
  result text not null,
  score integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  path text,
  label text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;
alter table public.inquiries enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.quiz_responses enable row level security;
alter table public.site_events enable row level security;

alter table public.newsletter_subscribers add column if not exists active boolean not null default true;
alter table public.inquiries add column if not exists company text;
alter table public.inquiries add column if not exists subject text;
alter table public.inquiries add column if not exists product text;
alter table public.inquiries add column if not exists volume text;
alter table public.inquiries add column if not exists status text not null default 'new';
alter table public.orders add column if not exists order_ref text unique;
alter table public.orders add column if not exists city text;
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists discount_code text;
alter table public.orders add column if not exists note text;
alter table public.products add column if not exists cost numeric(10,2) not null default 0;
alter table public.products add column if not exists sku text;
alter table public.products add column if not exists min_order integer not null default 1;
alter table public.products add column if not exists sold integer not null default 0;
alter table public.products add column if not exists rating numeric(2,1) not null default 4.9;
alter table public.products add column if not exists reviews integer not null default 0;
alter table public.products add column if not exists category text not null default 'Retail';
alter table public.products add column if not exists price_note text;
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists urgency text;

drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can send inquiry" on public.inquiries;
create policy "Anyone can send inquiry"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products"
on public.products
for select
to anon, authenticated
using (active = true);

drop policy if exists "Authenticated can read products" on public.products;
create policy "Authenticated can read products"
on public.products
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can update products" on public.products;
create policy "Admin ui can update products"
on public.products
for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can create products" on public.products;
create policy "Admin ui can create products"
on public.products
for insert
to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Anyone can create order" on public.orders;
create policy "Anyone can create order"
on public.orders
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can create order items" on public.order_items;
create policy "Anyone can create order items"
on public.order_items
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can submit quiz" on public.quiz_responses;
create policy "Anyone can submit quiz"
on public.quiz_responses
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can track site event" on public.site_events;
create policy "Anyone can track site event"
on public.site_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admin ui can read subscribers" on public.newsletter_subscribers;
create policy "Admin ui can read subscribers"
on public.newsletter_subscribers
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can read inquiries" on public.inquiries;
create policy "Admin ui can read inquiries"
on public.inquiries
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can read orders" on public.orders;
create policy "Admin ui can read orders"
on public.orders
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can delete orders" on public.orders;
create policy "Admin ui can delete orders"
on public.orders
for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can read order items" on public.order_items;
create policy "Admin ui can read order items"
on public.order_items
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can delete order items" on public.order_items;
create policy "Admin ui can delete order items"
on public.order_items
for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create or replace function public.delete_order_admin(target_order_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  if (auth.jwt() -> 'app_metadata' ->> 'role') <> 'admin' then
    raise exception 'Admin permission required to delete orders.';
  end if;

  delete from public.order_items
  where order_id = target_order_id;

  delete from public.orders
  where id = target_order_id;

  get diagnostics deleted_count = row_count;

  if deleted_count = 0 then
    raise exception 'Order was not found or could not be deleted.';
  end if;

  return true;
end;
$$;

revoke all on function public.delete_order_admin(uuid) from public;
grant execute on function public.delete_order_admin(uuid) to authenticated;

drop policy if exists "Admin ui can read quiz responses" on public.quiz_responses;
create policy "Admin ui can read quiz responses"
on public.quiz_responses
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admin ui can read site events" on public.site_events;
create policy "Admin ui can read site events"
on public.site_events
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.products
  (slug, name, sku, description, price, cost, image_url, min_order, stock, sold, rating, reviews, category, price_note, badge, urgency, active)
values
  (
    'single-use-pack',
    'Single Use Pack',
    'INE-001',
    'Biodegradable single use toilet seat covers. Individually wrapped, eco-friendly.',
    250,
    150,
    '/normalnew.png',
    10,
    1240,
    3240,
    4.9,
    128,
    'Retail',
    'per pack · min 10 packs',
    'Single Use',
    'Low Stock',
    true
  ),
  (
    'travel-pack',
    'Travel Pack (Waterproof)',
    'INE-002',
    'Waterproof and anti-slip, ideal for families and frequent travelers.',
    350,
    250,
    '/travelnew.png',
    5,
    340,
    1870,
    4.8,
    94,
    'Retail',
    'per 10-pack · min 5 packs',
    'Budget Friendly',
    'Selling Fast',
    true
  ),
  (
    'enterprise-pack',
    'Enterprise Pack (Flushable)',
    'INE-003',
    'Bulk packs for offices, hotels, and businesses.',
    750,
    550,
    '/interprisenew.png',
    100,
    85,
    940,
    4.9,
    67,
    'B2B',
    'per pack · bulk rate · min 100 packs',
    'Best Seller',
    null,
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  sku = excluded.sku,
  description = excluded.description,
  price = excluded.price,
  cost = excluded.cost,
  image_url = excluded.image_url,
  min_order = excluded.min_order,
  stock = excluded.stock,
  sold = excluded.sold,
  rating = excluded.rating,
  reviews = excluded.reviews,
  category = excluded.category,
  price_note = excluded.price_note,
  badge = excluded.badge,
  urgency = excluded.urgency,
  active = excluded.active;

do $$
declare
  realtime_table text;
begin
  foreach realtime_table in array array[
    'products',
    'orders',
    'order_items',
    'inquiries',
    'newsletter_subscribers',
    'quiz_responses',
    'site_events'
  ]
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', realtime_table);
    exception
      when duplicate_object then null;
      when undefined_object then null;
    end;
  end loop;
end $$;

do $$
declare
  admin_user_id uuid;
  admin_email text := 'owner@intimatehygiene.lk';
  admin_password text := current_setting('app.admin_password', true);
begin
  if admin_password is null or admin_password = '' then
    return;
  end if;

  select id into admin_user_id from auth.users where email = admin_email;

  if admin_user_id is null then
    admin_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      admin_user_id,
      'authenticated',
      'authenticated',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      now(),
      '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
      '{"username":"owner","name":"Aakash Wijesekara","role":"Super Admin","avatar":"AP"}'::jsonb,
      now(),
      now()
    );
  else
    update auth.users
    set
      encrypted_password = crypt(admin_password, gen_salt('bf')),
      email_confirmed_at = coalesce(email_confirmed_at, now()),
      raw_app_meta_data = '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
      raw_user_meta_data = '{"username":"owner","name":"Aakash Wijesekara","role":"Super Admin","avatar":"AP"}'::jsonb,
      updated_at = now()
    where id = admin_user_id;
  end if;

  insert into auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    admin_user_id::text,
    admin_user_id,
    jsonb_build_object(
      'sub', admin_user_id::text,
      'email', admin_email,
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    now(),
    now(),
    now()
  )
  on conflict (provider_id, provider) do update set
    identity_data = excluded.identity_data,
    updated_at = now();
end $$;
