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

// She pastes whatever YouTube gives her - a full watch URL, a youtu.be share
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

// ---- YouTube playlist import ----------------------------------------------

type PlaylistVideo = { videoId: string; title: string }

/** Pull the playlist id out of a full URL or accept a bare id. */
function extractPlaylistId(raw: string): string | null {
  const s = raw.trim()
  const m = s.match(/[?&]list=([A-Za-z0-9_-]+)/)
  if (m) return m[1]
  if (/^[A-Za-z0-9_-]{10,}$/.test(s)) return s
  return null
}

const SKIP_TITLES = new Set(['Private video', 'Deleted video', '[Private video]', '[Deleted video]'])

/**
 * Fetch a playlist's videos via the official Data API. Requires YOUTUBE_API_KEY.
 * Paginates through every page (handles playlists larger than 50).
 */
async function fetchPlaylistViaApi(playlistId: string, apiKey: string): Promise<PlaylistVideo[]> {
  const out: PlaylistVideo[] = []
  let pageToken = ''
  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`YouTube API ${res.status}: ${(await res.text()).slice(0, 200)}`)
    const json = await res.json()
    for (const item of json.items ?? []) {
      const videoId = item?.snippet?.resourceId?.videoId
      const title = item?.snippet?.title
      if (videoId && title && !SKIP_TITLES.has(title)) out.push({ videoId, title })
    }
    pageToken = json.nextPageToken ?? ''
  } while (pageToken)
  return out
}

/**
 * Fallback with no API key: scrape the public playlist page's embedded
 * ytInitialData JSON. Returns the first page of videos (up to ~100).
 */
async function fetchPlaylistViaScrape(playlistId: string): Promise<PlaylistVideo[]> {
  const res = await fetch(`https://www.youtube.com/playlist?list=${playlistId}&hl=en`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`YouTube returned ${res.status}. Try again or set YOUTUBE_API_KEY.`)
  const html = await res.text()
  const m = html.match(/ytInitialData\s*=\s*({[\s\S]+?})\s*;\s*<\/script>/)
  if (!m) throw new Error('Could not read the playlist (YouTube markup changed or the playlist is private).')

  const data = JSON.parse(m[1])
  const out: PlaylistVideo[] = []
  // Walk the structure defensively - YouTube nests the video list deep and the
  // exact path shifts, so recurse and collect every playlistVideoRenderer.
  const stack = [data]
  while (stack.length) {
    const node = stack.pop()
    if (!node || typeof node !== 'object') continue
    const r = (node as Record<string, unknown>).playlistVideoRenderer as
      | { videoId?: string; title?: { runs?: { text?: string }[]; simpleText?: string } }
      | undefined
    if (r?.videoId) {
      const title = r.title?.runs?.[0]?.text ?? r.title?.simpleText ?? ''
      if (title && !SKIP_TITLES.has(title)) out.push({ videoId: r.videoId, title })
    }
    for (const v of Object.values(node)) {
      if (v && typeof v === 'object') stack.push(v as Record<string, unknown>)
    }
  }
  // De-dupe within the page (recursion can revisit) preserving first-seen order.
  const seen = new Set<string>()
  return out.filter((v) => (seen.has(v.videoId) ? false : seen.add(v.videoId)))
}

/**
 * Import every video from a YouTube playlist into content_items. Each becomes an
 * item of `type`, keeping its original YouTube title. Videos already present
 * (same youtube_id) are skipped, so re-running is safe and only adds new ones.
 */
export async function importYoutubePlaylist(
  playlistUrl: string,
  type: string,
  isPremium: boolean,
): Promise<Result & { added?: number; skipped?: number; total?: number }> {
  await requireAdmin()

  const playlistId = extractPlaylistId(playlistUrl)
  if (!playlistId) return { ok: false, error: 'Could not find a playlist id in that link.' }

  let videos: PlaylistVideo[]
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    videos = apiKey
      ? await fetchPlaylistViaApi(playlistId, apiKey)
      : await fetchPlaylistViaScrape(playlistId)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to read the playlist.' }
  }

  if (videos.length === 0) return { ok: false, error: 'No videos found in that playlist.' }

  const supabase = createAdminClient()

  // Skip anything already imported (dedupe by youtube_id).
  const { data: existing } = await supabase.from('content_items').select('youtube_id')
  const have = new Set((existing ?? []).map((r: { youtube_id: string | null }) => r.youtube_id).filter(Boolean))
  const fresh = videos.filter((v) => !have.has(v.videoId))

  if (fresh.length === 0) {
    return { ok: true, added: 0, skipped: videos.length, total: videos.length }
  }

  // Preserve playlist order: first video gets the newest published_at so it
  // sorts to the top of the "newest first" listings.
  const base = Date.now()
  const rows = fresh.map((v, i) => ({
    type,
    title: v.title,
    description: null,
    youtube_id: v.videoId,
    thumbnail_url: null,
    is_premium: isPremium,
    published_at: new Date(base - i * 60_000).toISOString(),
    series_id: null,
    episode_number: null,
  }))

  const { error } = await supabase.from('content_items').insert(rows)
  if (error) return { ok: false, error: error.message }

  revalidatePath('/admin/content')
  revalidatePath('/watch')
  revalidatePath('/series')
  revalidatePath('/')
  return { ok: true, added: fresh.length, skipped: videos.length - fresh.length, total: videos.length }
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
// pause the Paddle subscription here too, or the two will desync - she stops
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

// ---- Comparison features ("What's Included" table on /membership) ----------

export interface ComparisonFeatureInput {
  feature: string
  included_plan_ids: string[]   // membership_plans.id values that get a check
  sort_order: number
}

export async function createFeature(input: ComparisonFeatureInput): Promise<Result> {
  await requireAdmin()
  if (!input.feature.trim()) return { ok: false, error: 'Emri i veçorisë është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('comparison_features').insert({
    feature: input.feature.trim(),
    included_plan_ids: input.included_plan_ids,
    sort_order: input.sort_order,
  })
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
  return { ok: true }
}

export async function updateFeature(id: string, input: ComparisonFeatureInput): Promise<Result> {
  await requireAdmin()
  if (!input.feature.trim()) return { ok: false, error: 'Emri i veçorisë është i detyrueshëm.' }
  const supabase = createAdminClient()
  const { error } = await supabase.from('comparison_features').update({
    feature: input.feature.trim(),
    included_plan_ids: input.included_plan_ids,
    sort_order: input.sort_order,
  }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  revalidatePlans()
  return { ok: true }
}

export async function deleteFeature(id: string): Promise<Result> {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('comparison_features').delete().eq('id', id)
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
