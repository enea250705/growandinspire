'use server'

import { requireAdmin } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

type Result = { ok: true } | { ok: false; error: string }

// ---- Applications (dinner + job/guest/investment) --------------------------

export async function setDinnerStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('dinner_applications').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/applications')
  return { ok: true }
}

export async function setApplicationStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('applications').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/applications')
  return { ok: true }
}

// ---- Event registrations ---------------------------------------------------

export async function setRegistrationStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('event_registrations').update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/registrations')
  return { ok: true }
}

// ---- Content manager -------------------------------------------------------

export interface ContentInput {
  type: string
  title: string
  description: string
  youtube_id: string
  is_premium: boolean
  published_at: string
}

export async function createContent(input: ContentInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').insert({
    type: input.type,
    title: input.title,
    description: input.description || null,
    youtube_id: input.youtube_id || null,
    is_premium: input.is_premium,
    published_at: input.published_at || new Date().toISOString(),
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  return { ok: true }
}

export async function updateContent(id: string, input: ContentInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').update({
    type: input.type,
    title: input.title,
    description: input.description || null,
    youtube_id: input.youtube_id || null,
    is_premium: input.is_premium,
    published_at: input.published_at,
  }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  return { ok: true }
}

export async function deleteContent(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  return { ok: true }
}

// ---- Memberships (manual grant/revoke until Stripe / B4) --------------------

export async function grantMembership(
  email: string,
  tier: 'individual' | 'professional' | 'corporate'
): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()

  // find the auth user by email
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) return { ok: false, error: listErr.message }
  const target = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (!target) return { ok: false, error: 'Nuk u gjet përdorues me këtë email. Ai duhet të regjistrohet së pari.' }

  // deactivate any existing active rows, then insert a fresh active one
  await supabase.from('memberships').update({ status: 'cancelled' }).eq('user_id', target.id).eq('status', 'active')
  const { error } = await supabase.from('memberships').insert({
    user_id: target.id,
    tier,
    status: 'active',
    started_at: new Date().toISOString(),
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/members')
  return { ok: true }
}

export async function revokeMembership(membershipId: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('memberships').update({ status: 'cancelled' }).eq('id', membershipId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/members')
  return { ok: true }
}

// ---- Site settings ---------------------------------------------------------

export async function updateSettings(values: Record<string, string>): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const rows = Object.entries(values).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }))
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/')
  revalidatePath('/coaching')
  revalidatePath('/admin/settings')
  return { ok: true }
}

// ---- Admin management ------------------------------------------------------

export async function addAdmin(email: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) return { ok: false, error: listErr.message }
  const target = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (!target) return { ok: false, error: 'Nuk u gjet përdorues me këtë email. Ai duhet të regjistrohet së pari.' }

  const { error } = await supabase.from('admins').upsert({ user_id: target.id }, { onConflict: 'user_id' })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/admins')
  return { ok: true }
}

export async function removeAdmin(userId: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()

  // Never allow removing the last admin (would lock everyone out of /admin).
  const { count } = await supabase.from('admins').select('user_id', { count: 'exact', head: true })
  if ((count ?? 0) <= 1) {
    return { ok: false, error: 'Nuk mund të heqësh adminin e fundit.' }
  }

  const { error } = await supabase.from('admins').delete().eq('user_id', userId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/admins')
  return { ok: true }
}

// ---- CV signed download ----------------------------------------------------

export async function getCvUrl(path: string): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage.from('cvs').createSignedUrl(path, 120)
  if (error || !data) return { ok: false, error: error?.message ?? 'Gabim' }
  return { ok: true, url: data.signedUrl }
}
