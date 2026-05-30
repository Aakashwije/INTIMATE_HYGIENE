-- Drops the "per pack / minimum order" framing from the catalog. Every product
-- is now a fixed-price item with min_order = 1; customers buy more by raising
-- the quantity. Idempotent: re-running is safe (UPDATE by slug).

update public.products set min_order = 1 where min_order <> 1;

update public.products set price_note = 'Extra single-use pack'
  where slug = 'single-use-pack';

update public.products set price_note = 'Extra waterproof pack'
  where slug = 'travel-pack';

update public.products set price_note = 'Extra enterprise pack'
  where slug = 'enterprise-pack';

update public.products set price_note = '5-pack bundle'
  where slug = 'non-waterproof-5-pack';

update public.products set price_note = '5-pack waterproof bundle'
  where slug = 'waterproof-5-pack';

update public.products set price_note = '10 packs + free dispenser & instructions'
  where slug = 'enterprise-10-pack';
