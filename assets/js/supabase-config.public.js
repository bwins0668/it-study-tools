/**
 * Study Tools Supabase public configuration (Round 23.21).
 *
 * This file is checked into the repository and deployed to Cloudflare Pages.
 * It contains the Supabase project URL and the publishable (anon) key,
 * which are safe to expose on the client side.
 *
 * Supabase documentation: "The anon key is safe to use in browser code."
 * Only the service_role key must never be exposed.
 */
window.STUDY_TOOLS_SUPABASE_CONFIG = {
  enabled: true,
  url: "https://bycooiqmdtcqnconvtns.supabase.co",
  anonKey: "sb_publishable_zvS0AVSzvBw2LjCV-HHB8w_D0bn9k0M",
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
};
