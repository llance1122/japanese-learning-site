-- ============================================================
--   增補：讓使用者可以自行刪除帳號的 RPC 函式
--   在 Supabase Dashboard 的 SQL Editor 整段貼上執行
-- ============================================================

-- 一個 security definer 函式，讓登入中的使用者刪除自己的帳號
-- 注意：security definer 等於用 owner 權限執行，所以能刪 auth.users
create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  uid uuid;
begin
  uid := auth.uid();
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  -- 先刪 public.user_data（FK on delete cascade 也會處理，但保險起見明確刪）
  delete from public.user_data where user_id = uid;

  -- 刪 auth.users（會 cascade 清掉 session、identity 等）
  delete from auth.users where id = uid;
end;
$$;

-- 只允許登入中的使用者呼叫
revoke all on function public.delete_user() from public;
grant execute on function public.delete_user() to authenticated;
