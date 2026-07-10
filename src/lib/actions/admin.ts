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

async function setStatusOn(table: string, id: string, status: 'approved' | 'rejected' | 'pending'): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/applications')
  return { ok: true }
}

export async function setPodcastStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  return setStatusOn('podcast_applications', id, status)
}

export async function setIdeaTableStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  return setStatusOn('idea_tables_applications', id, status)
}

export async function setCoachingStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  return setStatusOn('coaching_applications', id, status)
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
  thumbnail_url: string
  is_premium: boolean
  published_at: string
  /** Series this video belongs to, '' = none. */
  series_id: string
  /** Order within the series; '' = unset. */
  episode_number: string
}

export interface SeriesInput {
  title: string
  description: string
  thumbnail_url: string
  sort_order: number
  is_published: boolean
}

// She pastes whatever YouTube gives her — a full watch URL, a youtu.be share
// link, a Shorts/embed URL, or (rarely) the bare 11-char ID. Normalise to the
// ID we store, so she never has to hand-extract it. Unrecognised input is
// returned trimmed as-is rather than dropped, so a typo stays visible/fixable.
function extractYoutubeId(raw: string): string | null {
  const s = (raw || '').trim()
  if (!s) return null
  // Already a bare ID.
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,        // watch?v=ID
    /youtu\.be\/([A-Za-z0-9_-]{11})/,   // youtu.be/ID
    /\/shorts\/([A-Za-z0-9_-]{11})/,    // /shorts/ID
    /\/embed\/([A-Za-z0-9_-]{11})/,     // /embed/ID
    /\/live\/([A-Za-z0-9_-]{11})/,      // /live/ID
  ]
  for (const re of patterns) {
    const m = s.match(re)
    if (m) return m[1]
  }
  return s
}

// Public pages can no longer build a thumbnail from the video ID (that leaked the
// ID of every unlisted premium video), so an item without thumbnail_url renders
// as a plain gradient. This field is how it gets a real image.
export async function createContent(input: ContentInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').insert({
    type: input.type,
    title: input.title,
    description: input.description || null,
    youtube_id: extractYoutubeId(input.youtube_id),
    thumbnail_url: input.thumbnail_url || null,
    is_premium: input.is_premium,
    published_at: input.published_at || new Date().toISOString(),
    series_id: input.series_id || null,
    episode_number: input.episode_number ? Number(input.episode_number) : null,
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true }
}

export async function updateContent(id: string, input: ContentInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').update({
    type: input.type,
    title: input.title,
    description: input.description || null,
    youtube_id: extractYoutubeId(input.youtube_id),
    thumbnail_url: input.thumbnail_url || null,
    is_premium: input.is_premium,
    published_at: input.published_at,
    series_id: input.series_id || null,
    episode_number: input.episode_number ? Number(input.episode_number) : null,
  }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true }
}

// ---- Series ----------------------------------------------------------------

export async function createSeries(input: SeriesInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('series').insert({
    title: input.title,
    description: input.description || null,
    thumbnail_url: input.thumbnail_url || null,
    sort_order: input.sort_order,
    is_published: input.is_published,
  })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/series')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true }
}

export async function updateSeries(id: string, input: SeriesInput): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('series').update({
    title: input.title,
    description: input.description || null,
    thumbnail_url: input.thumbnail_url || null,
    sort_order: input.sort_order,
    is_published: input.is_published,
  }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/series')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true }
}

export async function deleteSeries(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  // Videos in this series keep existing; their series_id is nulled by the FK's
  // ON DELETE SET NULL. So this only removes the container.
  const { error } = await supabase.from('series').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/series')
  revalidatePath('/admin/content')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true }
}

export async function deleteContent(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('content_items').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/content')
  revalidatePath('/watch')
  revalidatePath('/series')
  revalidatePath('/')
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

// ---- Job positions ---------------------------------------------------------
//
// Closed positions stay invisible to the public (RLS: only is_open = true is
// readable), so a role can be drafted before it is published.

export interface JobPositionInput {
  title: string
  department: string
  location: string
  employment_type: string
  description: string
  requirements: string
  is_open: boolean
  sort_order: number
}

function jobRow(input: JobPositionInput) {
  return {
    title: input.title,
    department: input.department || null,
    location: input.location || null,
    employment_type: input.employment_type || null,
    description: input.description || null,
    requirements: input.requirements || null,
    is_open: input.is_open,
    sort_order: input.sort_order,
  }
}

function revalidateJobs() {
  revalidatePath('/admin/jobs')
  revalidatePath('/careers')
  revalidatePath('/apply')
}

export async function createPosition(input: JobPositionInput): Promise<Result> {
  await requireAdmin()
  if (!input.title.trim()) return { ok: false, error: 'Titulli është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('job_positions').insert(jobRow(input))
  if (error) return { ok: false, error: error.message }
  revalidateJobs()
  return { ok: true }
}

export async function updatePosition(id: string, input: JobPositionInput): Promise<Result> {
  await requireAdmin()
  if (!input.title.trim()) return { ok: false, error: 'Titulli është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('job_positions').update(jobRow(input)).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidateJobs()
  return { ok: true }
}

/** Close a role instead of deleting it, so past applications keep their context. */
export async function setPositionOpen(id: string, isOpen: boolean): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('job_positions').update({ is_open: isOpen }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidateJobs()
  return { ok: true }
}

export async function deletePosition(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('job_positions').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidateJobs()
  return { ok: true }
}

// ---- User management -------------------------------------------------------
//
// These run with the service role and can reset any password or destroy any
// account, so every one re-checks requireAdmin() and refuses the two moves that
// would lock everybody out of /admin: deleting yourself, and removing the last
// admin.

async function isLastAdmin(userId: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('admins').select('user_id')
  const admins = data ?? []
  return admins.length <= 1 && admins.some((a) => a.user_id === userId)
}

export async function setUserPassword(userId: string, newPassword: string): Promise<Result> {
  await requireAdmin()
  if (newPassword.length < 6) {
    return { ok: false, error: 'Fjalëkalimi duhet të ketë të paktën 6 karaktere.' }
  }
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.updateUserById(userId, { password: newPassword })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/users')
  return { ok: true }
}

/** Irreversible. Cascades the user's memberships and admins rows via the FK. */
export async function deleteUser(userId: string): Promise<Result> {
  const actor = await requireAdmin()

  if (actor.id === userId) {
    return { ok: false, error: 'Nuk mund të fshish llogarinë tënde.' }
  }
  if (await isLastAdmin(userId)) {
    return { ok: false, error: 'Nuk mund të fshish adminin e fundit.' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/users')
  revalidatePath('/admin/members')
  revalidatePath('/admin/admins')
  return { ok: true }
}

/** Confirm an email by hand, for a user stuck without a working confirmation link. */
export async function confirmUserEmail(userId: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.updateUserById(userId, { email_confirm: true })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/users')
  return { ok: true }
}

// ---- Membership suspend / resume -------------------------------------------
//
// isMember() counts only status = 'active', so suspending gates content on the
// next request. 'suspended' is distinct from 'cancelled' on purpose: the member
// did not quit, and the suspension is meant to be lifted.
//
// TODO(Paddle): a local suspend stops access but not billing. When B4 lands,
// pause the Paddle subscription here too, or the two will desync — she stops
// their access while Paddle keeps charging the card.

export async function suspendMembership(membershipId: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('memberships')
    .update({ status: 'suspended', suspended_at: new Date().toISOString() })
    .eq('id', membershipId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/members')
  return { ok: true }
}

export async function resumeMembership(membershipId: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('memberships')
    .update({ status: 'active', suspended_at: null })
    .eq('id', membershipId)
  if (error) return { ok: false, error: error.message }
  revalidatePath('/admin/members')
  return { ok: true }
}

// ---- Membership plans (pricing cards on /membership) -----------------------
//
// Scope: these edit only the pricing CARDS. The comparison table and the
// entitlement tier system (MembershipTier) are separate and untouched.

export interface MembershipPlanInput {
  label: string
  price: string
  period: string
  description: string
  features: string          // one per line
  cta: string
  cta_href: string
  badge: string             // '' = no badge
  highlight: boolean
  is_published: boolean
  sort_order: number
}

function planRow(input: MembershipPlanInput) {
  return {
    label: input.label.trim(),
    price: input.price.trim() || '0',
    period: input.period.trim() || '/ month',
    description: input.description.trim() || null,
    features: input.features.trim() || null,
    cta: input.cta.trim() || 'Get Started',
    cta_href: input.cta_href.trim() || '/login',
    badge: input.badge.trim() || null,
    highlight: input.highlight,
    is_published: input.is_published,
    sort_order: input.sort_order,
  }
}

function revalidatePlans() {
  revalidatePath('/admin/plans')
  revalidatePath('/membership')
  revalidatePath('/')
}

export async function createPlan(input: MembershipPlanInput): Promise<Result> {
  await requireAdmin()
  if (!input.label.trim()) return { ok: false, error: 'Emri i planit është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('membership_plans').insert(planRow(input))
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
  return { ok: true }
}

export async function updatePlan(id: string, input: MembershipPlanInput): Promise<Result> {
  await requireAdmin()
  if (!input.label.trim()) return { ok: false, error: 'Emri i planit është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('membership_plans').update(planRow(input)).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
  return { ok: true }
}

export async function setPlanPublished(id: string, isPublished: boolean): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('membership_plans').update({ is_published: isPublished }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
  return { ok: true }
}

export async function deletePlan(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('membership_plans').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
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

export async function getPitchDeckUrl(path: string): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage.from('pitch-decks').createSignedUrl(path, 120)
  if (error || !data) return { ok: false, error: error?.message ?? 'Gabim' }
  return { ok: true, url: data.signedUrl }
}
