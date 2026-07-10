import { createAdminClient } from '@/lib/supabase/admin'
import { ContentClient } from './ContentClient'
import type { AdminContentItem, Series } from '@/types'

export default async function AdminContentPage() {
  // Service role: admins legitimately need youtube_id, which anon and
  // authenticated have no column privilege on.
  const supabase = createAdminClient()
  const [{ data }, { data: series }] = await Promise.all([
    supabase
      .from('content_items')
      .select('id, type, title, description, youtube_id, thumbnail_url, is_premium, published_at, has_video, series_id, episode_number')
      .order('published_at', { ascending: false }),
    supabase
      .from('series')
      .select('id, title, description, thumbnail_url, sort_order, is_published, created_at')
      .order('sort_order', { ascending: true }),
  ])

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Content Manager</h1>
        <p className="text-black/50">Shto, ndrysho ose fshi episode. Cakto një seri për t&apos;i grupuar. Ndryshimet shfaqen në site brenda pak minutash.</p>
      </div>
      <ContentClient items={(data ?? []) as AdminContentItem[]} series={(series ?? []) as Series[]} />
    </>
  )
}
