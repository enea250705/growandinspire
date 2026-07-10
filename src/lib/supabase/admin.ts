import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client. Bypasses RLS - use ONLY in server code
 * (admin server components / server actions) AFTER verifying the caller is an
 * admin via requireAdmin(). Never import this into a client component
 * (SUPABASE_SERVICE_ROLE_KEY is server-only and would be undefined there).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
