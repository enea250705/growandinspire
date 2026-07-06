import { createAdminClient } from '@/lib/supabase/admin'
import { ContentClient } from './ContentClient'
import type { ContentItem } from '@/types'

export default async function AdminContentPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('content_items')
    .select('id, type, title, description, youtube_id, thumbnail_url, is_premium, published_at')
    .order('published_at', { ascending: false })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Content Manager</h1>
        <p className="text-black/50">Shto, ndrysho ose fshi episode. Ndryshimet shfaqen në site brenda pak minutash.</p>
      </div>
      <ContentClient items={(data ?? []) as ContentItem[]} />
    </>
  )
}
