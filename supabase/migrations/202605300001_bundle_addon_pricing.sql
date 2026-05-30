-- Makes the fixed bundle offers the primary catalog and keeps single packs as
-- add-ons. This is intentionally scoped to product identity/pricing fields so
-- live stock, sold counts, ratings, and reviews are preserved.

insert into public.products
  (slug, name, sku, description, price, cost, image_url, category, price_note, badge, urgency, active)
values
  (
    'single-use-pack',
    'Single Use Add-On Pack',
    'INE-001',
    'Extra non-waterproof single-use pack for customers who need more than the 5-pack bundle.',
    250,
    150,
    '/normalnew.png',
    'Add-On',
    'Extra single-use pack',
    'Add-On',
    null,
    true
  ),
  (
    'travel-pack',
    'Waterproof Add-On Pack',
    'INE-002',
    'Extra waterproof, anti-slip pack for customers who need more than the 5-pack bundle.',
    350,
    250,
    '/travelnew.png',
    'Add-On',
    'Extra waterproof pack',
    'Add-On',
    null,
    true
  ),
  (
    'enterprise-pack',
    'Enterprise Add-On Pack',
    'INE-003',
    'Extra flushable enterprise pack for offices, hotels, and businesses that need more than the 10-pack offer.',
    950,
    550,
    '/interprisenew.png',
    'Add-On',
    'Extra enterprise pack',
    'Add-On',
    null,
    true
  ),
  (
    'non-waterproof-5-pack',
    'Non-Waterproof 5-Pack',
    'INE-001-5PK',
    'Value bundle of 5 biodegradable single-use toilet seat cover packs. Eco-friendly, individually wrapped, and flushable.',
    1099,
    750,
    '/normalnew.png',
    'Bundle',
    '5-pack bundle',
    'Bundle Deal',
    'Selling Fast',
    true
  ),
  (
    'waterproof-5-pack',
    'Waterproof 5-Pack',
    'INE-002-5PK',
    'Value bundle of 5 waterproof, anti-slip toilet seat cover packs. Perfect for families and frequent travellers.',
    1499,
    1100,
    '/travelnew.png',
    'Bundle',
    '5-pack waterproof bundle',
    'Waterproof',
    'Popular',
    true
  ),
  (
    'enterprise-10-pack',
    'Enterprise 10-Pack + Free Dispenser',
    'INE-003-10PK',
    'Bundle of 10 flushable packs that ships with a FREE plastic dispenser and instructions. Ideal for offices, hotels, and businesses.',
    8700,
    6000,
    '/interprisenew.png',
    'Bundle',
    '10 packs + free dispenser & instructions',
    'Free Dispenser',
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
  category = excluded.category,
  price_note = excluded.price_note,
  badge = excluded.badge,
  urgency = excluded.urgency,
  active = excluded.active;
