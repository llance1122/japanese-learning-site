-- ============================================================
--   日本語スタート - 每日挑戰 + 排行榜
--   在 Supabase Dashboard 的 SQL Editor 整段貼上執行
--   （可重複執行，使用 if not exists / replace 設計）
-- ============================================================

-- 1) 每日挑戰分數表（每人每天一筆）
create table if not exists public.daily_challenges (
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  score        int  not null,
  max_score    int  not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, date)
);

create index if not exists idx_daily_challenges_date  on public.daily_challenges (date desc);
create index if not exists idx_daily_challenges_score on public.daily_challenges (score desc);

-- 2) RLS：每人只能寫自己；所有已登入使用者可讀所有分數（排行榜需要）
alter table public.daily_challenges enable row level security;

drop policy if exists "dc_select_all_auth"   on public.daily_challenges;
drop policy if exists "dc_insert_own"        on public.daily_challenges;
drop policy if exists "dc_update_own"        on public.daily_challenges;
drop policy if exists "dc_delete_own"        on public.daily_challenges;

create policy "dc_select_all_auth" on public.daily_challenges
  for select using (auth.role() = 'authenticated');

create policy "dc_insert_own" on public.daily_challenges
  for insert with check (auth.uid() = user_id);

create policy "dc_update_own" on public.daily_challenges
  for update using (auth.uid() = user_id);

create policy "dc_delete_own" on public.daily_challenges
  for delete using (auth.uid() = user_id);

-- 3) 排行榜 view
--    彙總每位玩家：總分、本週分、今日分、最佳單日、遊玩天數、最後遊玩日。
--    join user_data 拿 display_name。
--    用 security_invoker = false（預設）— view 以 owner 權限執行，
--    繞過 user_data 的 RLS 取得別人的 display_name，但 view 本身只
--    暴露 display_name + 彙總分數（沒選 progress，不會外洩進度）。
create or replace view public.leaderboard
with (security_invoker = false) as
select
  dc.user_id,
  coalesce(nullif(trim(ud.display_name), ''), '匿名玩家') as display_name,
  count(*)::int                                             as days_played,
  sum(dc.score)::int                                        as total_score,
  max(dc.score)::int                                        as best_score,
  sum(case when dc.date = current_date then dc.score else 0 end)::int as today_score,
  sum(case when dc.date >= current_date - 6 then dc.score else 0 end)::int as week_score,
  max(dc.date)                                              as last_played
from public.daily_challenges dc
left join public.user_data ud on ud.user_id = dc.user_id
group by dc.user_id, ud.display_name;

grant select on public.leaderboard to authenticated;
