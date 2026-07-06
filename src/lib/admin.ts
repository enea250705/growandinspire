import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

/** Current user if they are an admin, else null. */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  return data ? user : null
}

export async function isAdmin(): Promise<boolean> {
  return (await getAdminUser()) !== null
}

/** Redirect to /login if the caller is not an admin. Returns the admin user. */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser()
  if (!user) redirect('/login')
  return user
}
