import { createClient } from '@supabase/supabase-js'
import type { ContentItem, ContentType } from '@/types'
import { slugify } from '@/lib/content-meta'

// Cookieless anon client for reading public content. content_items has a
// "public read" RLS policy, so no session is needed. Staying cookieless keeps
// content pages cacheable (ISR) instead of forcing per-request rendering.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

const SELECT = 'id, type, title, description, youtube_id, thumbnail_url, is_premium, published_at'

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
    .not('youtube_id', 'is', null)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return (data as ContentItem) ?? null
}
