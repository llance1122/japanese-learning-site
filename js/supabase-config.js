// === 在 createClient 前先攔截 URL 上的 auth callback type ===
// 因為 detectSessionInUrl:true 會立刻把 hash/query 清掉，要先看一眼存起來
(function detectAuthCallback() {
  try {
    const combined = window.location.hash + window.location.search;
    const m = combined.match(/[?#&]type=([a-z_]+)/);
    if (m) {
      window.__authCallbackType = m[1]; // signup / recovery / email_change / magiclink ...
    }
  } catch (e) {}
})();

// === Supabase 設定 ===
// 這兩個值放前端是安全的（publishable key 與 anon key 同義）
// 真正的權限控制由 Supabase Row Level Security policy 把守
const SUPABASE_URL = 'https://kbifeqmxjofifdgwonus.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XLI46b47-XY84e3Mj1W1Ow_NZImZdU3';

// 建立全域 client（由 supabase-js UMD bundle 暴露的 supabase namespace 取 createClient）
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,  // OAuth 回跳時自動撈 session
    flowType: 'pkce'
  }
});
