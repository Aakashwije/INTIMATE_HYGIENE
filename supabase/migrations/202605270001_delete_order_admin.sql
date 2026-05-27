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
