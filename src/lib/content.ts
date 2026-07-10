import { createClient } from '@supabase/supabase-js'
import type { ContentItem, ContentType, Download, Series, SeriesWithVideos } from '@/types'
import { slugify } from '@/lib/content-meta'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { isMember } from '@/lib/membership'

// Cookieless anon client for reading public content. content_items has a
// "public read" RLS policy, so no session is needed. Staying cookieless keeps
// content pages cacheable (ISR) instead of forcing per-request rendering.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

// youtube_id is omitted on purpose - anon/authenticated have no privilege on that
// column. Selecting it here would error, and requesting it from the browser was
// how the premium library leaked. Reach for getPlayableYoutubeId() instead.
const SELECT = 'id, type, title, description, thumbnail_url, is_premium, published_at, has_video, series_id, episode_number'

export async function getAllContent(): Promise<ContentItem[]> {
  const { data } = await supabase
    .from('content_items')
    .select(SELECT)
    .order('published_at', { ascending: false })
  return (data as ContentItem[]) ?? []
}

export async function getContentByType(type: ContentType): Promise<ContentItem[]> {
  const { data } = await supabase
    .from('content_items')
    .select(SELECT)
    .eq('type', type)
    .order('published_at', { ascending: false })
  return (data as ContentItem[]) ?? []
}

export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  // slug isn't stored; derive from title and match in memory (small dataset).
  const items = await getContentByType(type)
  return items.find((c) => slugify(c.title) === slug) ?? null
}

export async function getFreeContent(limit?: number): Promise<ContentItem[]> {
  const query = supabase
    .from('content_items')
    .select(SELECT)
    .eq('is_premium', false)
    .neq('type', 'exclusive')
    .order('published_at', { ascending: false })
  const { data } = limit ? await query.limit(limit) : await query
  return (data as ContentItem[]) ?? []
}

export async function getPremiumContent(limit?: number): Promise<ContentItem[]> {
  const query = supabase
    .from('content_items')
    .select(SELECT)
    .eq('is_premium', true)
    .order('published_at', { ascending: false })
  const { data } = limit ? await query.limit(limit) : await query
  return (data as ContentItem[]) ?? []
}

export async function getFeatured(): Promise<ContentItem | null> {
  const { data } = await supabase
    .from('content_items')
    .select(SELECT)
    .eq('is_premium', false)
    .eq('has_video', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return (data as ContentItem) ?? null
}

/**
 * The YouTube ID for an item the caller is allowed to watch, or null.
 *
 * Re-checks entitlement against the database rather than trusting the caller:
 * a free item is playable by anyone, a premium item only by an active member.
 * Uses the service role because anon/authenticated cannot read the column.
 *
 * This is the only path from a content item to its video ID. Keep it that way -
 * the videos are unlisted on YouTube, so the ID is the access control.
 */
export async function getPlayableYoutubeId(id: string): Promise<string | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('content_items')
    .select('youtube_id, is_premium')
    .eq('id', id)
    .maybeSingle()

  if (!data?.youtube_id) return null
  if (data.is_premium && !(await isMember())) return null
  return data.youtube_id as string
}

// ---- Saved items -----------------------------------------------------------

/**
 * The logged-in user's bookmarked content, newest first. Reads through the
 * user's own session (RLS: "users read own saved"), so it returns [] when
 * logged out. The join pulls the public content columns only - never youtube_id.
 */
export async function getSavedContent(): Promise<ContentItem[]> {
  const server = await createServerClient()
  const { data: { user } } = await server.auth.getUser()
  if (!user) return []

  const { data } = await server
    .from('saved_items')
    .select(`content_id, created_at, content_items (${SELECT})`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // The embedded relation is typed as an array by the client, though the FK
  // makes it 0-or-1. Flatten and drop any nulls.
  type Row = { content_items: ContentItem | ContentItem[] | null }
  return ((data as unknown as Row[]) ?? [])
    .flatMap((r) => (Array.isArray(r.content_items) ? r.content_items : r.content_items ? [r.content_items] : []))
}

/** Set of content_ids the user has saved - for initial SaveButton state. */
export async function getSavedIds(): Promise<Set<string>> {
  const server = await createServerClient()
  const { data: { user } } = await server.auth.getUser()
  if (!user) return new Set()

  const { data } = await server
    .from('saved_items')
    .select('content_id')
    .eq('user_id', user.id)

  return new Set(((data as { content_id: string }[]) ?? []).map((r) => r.content_id))
}

/** Whether the logged-in user has bookmarked one item. */
export async function isSaved(contentId: string): Promise<boolean> {
  return (await getSavedIds()).has(contentId)
}

// ---- Downloads -------------------------------------------------------------

const DOWNLOAD_SELECT = 'id, title, description, file_url, is_premium, sort_order, created_at'

/**
 * Member resource files. Free files are readable by the public client (RLS:
 * "public reads free downloads"). Premium files are exposed only to active
 * members, fetched with the service role after the gate - the same philosophy
 * that protects premium youtube_id.
 */
export async function getDownloads(): Promise<Download[]> {
  if (await isMember()) {
    const admin = createAdminClient()
    const { data } = await admin
      .from('downloads')
      .select(DOWNLOAD_SELECT)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    return (data as Download[]) ?? []
  }

  const { data } = await supabase
    .from('downloads')
    .select(DOWNLOAD_SELECT)
    .eq('is_premium', false)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return (data as Download[]) ?? []
}

// ---- Series ----------------------------------------------------------------

const SERIES_SELECT = 'id, title, description, thumbnail_url, sort_order, is_published, created_at'

/** Published series, ordered for display. */
export async function getSeriesList(): Promise<Series[]> {
  const { data } = await supabase
    .from('series')
    .select(SERIES_SELECT)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return (data as Series[]) ?? []
}

/** Published series with a video count each (for listing cards). */
export async function getSeriesListWithCounts(): Promise<(Series & { videoCount: number })[]> {
  const { data } = await supabase
    .from('series')
    .select(`${SERIES_SELECT}, content_items(count)`)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  type Row = Series & { content_items: { count: number }[] }
  return ((data as Row[]) ?? []).map(({ content_items, ...s }) => ({
    ...s,
    videoCount: content_items?.[0]?.count ?? 0,
  }))
}

/** A published series plus its videos, matched by slugified title. */
export async function getSeriesBySlug(slug: string): Promise<SeriesWithVideos | null> {
  const list = await getSeriesList()
  const series = list.find((s) => slugify(s.title) === slug)
  if (!series) return null

  const { data } = await supabase
    .from('content_items')
    .select(SELECT)
    .eq('series_id', series.id)
    .order('episode_number', { ascending: true })
    .order('published_at', { ascending: false })

  return { ...series, videos: (data as ContentItem[]) ?? [] }
}
