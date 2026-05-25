-- ============================================================
--   日本語スタート - 每日挑戰分數折扣機制
--   每天可重玩，但第 N 次嘗試會被打折：
--     第 1 次：×100%   第 2 次：×70%
--     第 3 次：×50%    第 4 次：×35%
--     第 5+ 次：×25%
--   實際 score 永遠取「最佳折扣後分數」（重玩只會變高、不會變低）
--   在 Supabase Dashboard 的 SQL Editor 整段貼上執行（可重跑）
-- ============================================================

-- 1) 加 attempts 欄位（已建表→只加欄位）
alter table public.daily_challenges
  add column if not exists attempts int not null default 1;

-- 2) RPC：提交分數時自動算折扣 + 取 max + 增加 attempts
create or replace function public.submit_daily_score(
  p_date      date,
  p_raw_score int,
  p_max_score int
) returns table(final_score int, total_attempts int, multiplier_pct int)
language plpgsql security definer as $$
declare
  v_user         uuid := auth.uid();
  v_attempts     int;
  v_existing     int;
  v_mult         numeric;
  v_discounted   int;
  v_final        int;
  v_new_attempts int;
begin
  if v_user is null then
    raise exception 'not authenticated';
  end if;

  -- 抓現有 attempts / score
  select dc.attempts, dc.score
    into v_attempts, v_existing
    from public.daily_challenges dc
    where dc.user_id = v_user and dc.date = p_date;

  if v_attempts is null then v_attempts := 0; end if;
  if v_existing is null then v_existing := 0; end if;

  v_new_attempts := v_attempts + 1;

  -- 折扣
  v_mult := case v_new_attempts
    when 1 then 1.00
    when 2 then 0.70
    when 3 then 0.50
    when 4 then 0.35
    else        0.25
  end;

  v_discounted := round(p_raw_score * v_mult)::int;
  v_final := greatest(v_existing, v_discounted);

  insert into public.daily_challenges (user_id, date, score, max_score, attempts, completed_at)
  values (v_user, p_date, v_final, p_max_score, v_new_attempts, now())
  on conflict (user_id, date) do update
    set score        = excluded.score,
        attempts     = excluded.attempts,
        max_score    = excluded.max_score,
        completed_at = now();

  return query select v_final, v_new_attempts, (v_mult * 100)::int;
end;
$$;

grant execute on function public.submit_daily_score(date, int, int) to authenticated;

-- 3) 更新 leaderboard view：加上 today_attempts 欄位
--    註：CREATE OR REPLACE VIEW 不能改既有欄位順序，這裡用 DROP + CREATE
drop view if exists public.leaderboard;

create view public.leaderboard
with (security_invoker = false) as
select
  dc.user_id,
  coalesce(nullif(trim(ud.display_name), ''), '匿名玩家') as display_name,
  count(*)::int                                             as days_played,
  sum(dc.score)::int                                        as total_score,
  max(dc.score)::int                                        as best_score,
  sum(case when dc.date = current_date then dc.score else 0 end)::int    as today_score,
  max(case when dc.date = current_date then dc.attempts else 0 end)::int as today_attempts,
  sum(case when dc.date >= current_date - 6 then dc.score else 0 end)::int as week_score,
  max(dc.date)                                              as last_played
from public.daily_challenges dc
left join public.user_data ud on ud.user_id = dc.user_id
group by dc.user_id, ud.display_name;

grant select on public.leaderboard to authenticated;
