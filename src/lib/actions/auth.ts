'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type AuthResult = { ok: true } | { ok: false; error: string }

export async function signUp(data: {
  name: string
  email: string
  password: string
}): Promise<AuthResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { full_name: data.name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function signIn(data: {
  email: string
  password: string
}): Promise<AuthResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function sendPasswordReset(email: string): Promise<AuthResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function updateProfile(data: {
  full_name: string
  phone?: string
  profession?: string
}): Promise<AuthResult> {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: data.full_name,
      phone: data.phone,
      profession: data.profession,
    },
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export interface NotificationPrefs {
  events: boolean
  content: boolean
  coaching: boolean
  newsletter: boolean
}

export async function updateNotifications(prefs: NotificationPrefs): Promise<AuthResult> {
  const supabase = await createClient()
  // Stored on user_metadata alongside profile fields; updateUser merges top-level
  // keys, so full_name/phone/profession are preserved.
  const { error } = await supabase.auth.updateUser({ data: { notifications: prefs } })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function updatePassword(data: {
  newPassword: string
  confirmPassword: string
}): Promise<AuthResult> {
  if (data.newPassword !== data.confirmPassword) {
    return { ok: false, error: 'Fjalëkalimet nuk përputhen.' }
  }
  if (data.newPassword.length < 6) {
    return { ok: false, error: 'Fjalëkalimi duhet të ketë të paktën 6 karaktere.' }
  }
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: data.newPassword })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
