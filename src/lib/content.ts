import { createClient } from '@supabase/supabase-js'
import type { ContentItem, ContentType } from '@/types'
import { slugify } from '@/lib/content-meta'
import { createAdminClient } from '@/lib/supabase/admin'
import { isMember } from '@/lib/membership'

// Cookieless anon client for reading public content. content_items has a
// "public read" RLS policy, so no session is needed. Staying cookieless keeps
// content pages cacheable (ISR) instead of forcing per-request rendering.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

// youtube_id is omitted on purpose — anon/authenticated have no privilege on that
// column. Selecting it here would error, and requesting it from the browser was
// how the premium library leaked. Reach for getPlayableYoutubeId() instead.
const SELECT = 'id, type, title, description, thumbnail_url, is_premium, published_at, has_video'

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
 * This is the only path from a content item to its video ID. Keep it that way —
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
