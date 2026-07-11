import { createClient } from '@supabase/supabase-js'

/**
 * Cookieless anon client for reading public content (tables with public-read
 * RLS). Kept cookieless so pages stay cacheable (ISR).
 *
 * If the Supabase env vars are missing we fall back to a harmless placeholder
 * URL instead of passing `undefined`. `createClient(undefined, …)` throws
 * "supabaseUrl is required" at module-evaluation time, which would take down
 * every public page that imports a data module (the homepage included) rather
 * than letting it render with its built-in defaults. With the placeholder the
 * client constructs fine and queries simply resolve to `{ data: null }`, so
 * callers fall back gracefully.
 */
export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon-placeholder',
    { auth: { persistSession: false } }
  )
}
