-- ============================================================
--   日本語スタート - Supabase Schema
--   在 Supabase Dashboard 的 SQL Editor 整段貼上執行
-- ============================================================

-- 1) 使用者資料表（每人一筆，存學習進度 JSON）
create table if not exists public.user_data (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  progress     jsonb not null default '{}'::jsonb,
  updated_at   timestamptz not null default now()
);

-- 2) 啟用 Row Level Security
alter table public.user_data enable row level security;

-- 3) RLS Policies：每人只能讀寫自己的那一筆
drop policy if exists "own_select" on public.user_data;
drop policy if exists "own_insert" on public.user_data;
drop policy if exists "own_update" on public.user_data;
drop policy if exists "own_delete" on public.user_data;

create policy "own_select" on public.user_data
  for select using (auth.uid() = user_id);

create policy "own_insert" on public.user_data
  for insert with check (auth.uid() = user_id);

create policy "own_update" on public.user_data
  for update using (auth.uid() = user_id);

create policy "own_delete" on public.user_data
  for delete using (auth.uid() = user_id);

-- 4) 自動把 updated_at 維護成「最後更新時間」
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_data_updated_at on public.user_data;
create trigger trg_user_data_updated_at
  before update on public.user_data
  for each row execute function public.set_updated_at();

-- 5) 註冊時自動建立空的 user_data
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_data (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
