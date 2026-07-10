import { createAdminClient } from '@/lib/supabase/admin'
import { SeriesClient } from './SeriesClient'
import type { Series } from '@/types'

export default async function AdminSeriesPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('series')
    .select('id, title, description, thumbnail_url, sort_order, is_published, created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Seritë</h1>
        <p className="text-black/50">Krijo seri (programe) dhe grupo video brenda tyre. Cakto videot te secila seri nga Content Manager.</p>
      </div>
      <SeriesClient series={(data ?? []) as Series[]} />
    </>
  )
}
