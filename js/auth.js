// === Auth / 雲端同步模組 ===
// 對外 API：
//   AuthState.user          當前登入使用者（null 表示未登入）
//   AuthState.onChange(fn)  登入狀態變更時呼叫
//   AuthState.pushProgress(progress)  把本機進度推到雲端（自動防抖 1.5s）
//   AuthState.signIn(email, password)
//   AuthState.signUp(email, password, displayName)
//   AuthState.signOut()

(function () {
  'use strict';

  const listeners = [];
  let pushTimer = null;
  let initialChecked = false;  // 第一次 session 檢查是否完成

  const AuthState = {
    user: null,
    onChange(fn) {
      listeners.push(fn);
      // 若初始 session 檢查已完成，立刻 (microtask) 補觸發一次，
      // 避免「先 emit、後註冊 listener」造成 UI 沒更新到。
      if (initialChecked) {
        Promise.resolve().then(() => {
          try { fn(this.user); } catch (e) { console.error(e); }
        });
      }
    },
    _emit() {
      for (const fn of listeners) {
        try { fn(this.user); } catch (e) { console.error(e); }
      }
    },

    // ---- Auth actions ----
    async signUp(email, password, displayName) {
      const { data, error } = await sb.auth.signUp({
        email, password,
        options: { data: { display_name: displayName || '' } }
      });
      if (error) throw error;
      return data;
    },

    async signIn(email, password) {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },

    async signOut() {
      await sb.auth.signOut();
    },

    // 重新寄驗證信
    async resendVerification(email) {
      const { error } = await sb.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin }
      });
      if (error) throw error;
    },

    // 更新暱稱（同時寫 auth metadata 與 user_data 表）
    async updateDisplayName(name) {
      if (!this.user) throw new Error('未登入');
      const { error: e1 } = await sb.auth.updateUser({
        data: { display_name: name }
      });
      if (e1) throw e1;
      const { error: e2 } = await sb.from('user_data').upsert({
        user_id: this.user.id,
        display_name: name
      }, { onConflict: 'user_id' });
      if (e2) throw e2;
      this.user.displayName = name;
      this._emit();
    },

    async updateEmail(email) {
      const { error } = await sb.auth.updateUser({ email });
      if (error) throw error;
    },

    async updatePassword(password) {
      const { error } = await sb.auth.updateUser({ password });
      if (error) throw error;
    },

    // 刪除帳號（透過 RPC，需要 schema 中的 public.delete_user 函式）
    async deleteAccount() {
      if (!this.user) throw new Error('未登入');
      const { error } = await sb.rpc('delete_user');
      if (error) throw error;
      await sb.auth.signOut();
      // 清本機資料
      try { localStorage.removeItem('jp-learn-progress'); } catch (e) {}
    },

    // ---- 雲端進度 ----
    async fetchProgress() {
      if (!this.user) return null;
      const { data, error } = await sb.from('user_data')
        .select('progress, display_name, updated_at')
        .eq('user_id', this.user.id)
        .maybeSingle();
      if (error) {
        console.error('fetchProgress error', error);
        return null;
      }
      return data;
    },

    // 把整包 progress 推到雲端（防抖）
    pushProgress(progress) {
      if (!this.user) return;
      if (pushTimer) clearTimeout(pushTimer);
      pushTimer = setTimeout(async () => {
        try {
          const { error } = await sb.from('user_data').upsert({
            user_id: this.user.id,
            progress
          }, { onConflict: 'user_id' });
          if (error) console.error('pushProgress error', error);
        } catch (e) { console.error(e); }
      }, 1500);
    },

    // 強制立刻 flush（例如登出前）
    async flush(progress) {
      if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
      if (!this.user) return;
      const { error } = await sb.from('user_data').upsert({
        user_id: this.user.id,
        progress
      }, { onConflict: 'user_id' });
      if (error) console.error('flush error', error);
    },

    // ---- 每日挑戰 / 排行榜 ----

    // 提交今天的「原始」分數（伺服器自動算折扣 + 取 max + 增加 attempts）
    // 回傳 { final_score, total_attempts, multiplier_pct } 或 throw
    async submitDailyScore(date, rawScore, maxScore) {
      if (!this.user) throw new Error('未登入');
      const { data, error } = await sb.rpc('submit_daily_score', {
        p_date: date,
        p_raw_score: rawScore,
        p_max_score: maxScore
      });
      if (error) throw error;
      // data 是陣列 — RPC return table
      return (data && data[0]) || null;
    },

    // 查自己當天是否已完成（含 attempts）
    async fetchMyDailyScore(date) {
      if (!this.user) return null;
      const { data, error } = await sb.from('daily_challenges')
        .select('score, max_score, attempts, completed_at')
        .eq('user_id', this.user.id)
        .eq('date', date)
        .maybeSingle();
      if (error) {
        console.error('fetchMyDailyScore error', error);
        return null;
      }
      return data;
    },

    // 拉排行榜（leaderboard view 已彙總總分/週分/今日分/最後遊玩日）
    async fetchLeaderboard() {
      const { data, error } = await sb.from('leaderboard')
        .select('*')
        .order('total_score', { ascending: false });
      if (error) {
        console.error('fetchLeaderboard error', error);
        return [];
      }
      return data || [];
    }
  };

  function userFromSession(session) {
    if (!session?.user) return null;
    return {
      id: session.user.id,
      email: session.user.email,
      displayName: session.user.user_metadata?.display_name
        || (session.user.email || '').split('@')[0]
    };
  }

  // 監聽 supabase auth 狀態變動（會收到 INITIAL_SESSION / SIGNED_IN / SIGNED_OUT 等）
  sb.auth.onAuthStateChange(async (event, session) => {
    AuthState.user = userFromSession(session);
    initialChecked = true;
    AuthState._emit();
  });

  // 雙保險：也手動拉一次 session，避免某些瀏覽器環境下 onAuthStateChange 不發 INITIAL_SESSION
  sb.auth.getSession().then(({ data }) => {
    if (!initialChecked) {
      AuthState.user = userFromSession(data.session);
      initialChecked = true;
      AuthState._emit();
    }
  });

  window.AuthState = AuthState;
})();
