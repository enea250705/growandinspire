import { Mail, Download } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function AdminSubscribersPage() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('subscribers').select('email, created_at').order('created_at', { ascending: false })
  const subs = data ?? []

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Newsletter Subscribers</h1>
          <p className="text-black/50">{subs.length} abonentë.</p>
        </div>
        {subs.length > 0 && (
          <a
            href="/admin/subscribers/export"
            className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            <Download size={15} /> Eksporto CSV
          </a>
        )}
      </div>

      {subs.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8 text-black/40">
          Nuk ka abonentë ende.
        </div>
      ) : (
        <div className="bg-brand-white rounded-2xl border border-black/8 divide-y divide-black/6">
          {subs.map((s) => (
            <div key={s.email} className="p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-brand-black flex items-center gap-2">
                <Mail size={13} className="text-brand-gold" /> {s.email}
              </p>
              <p className="text-xs text-black/30">{fmt(s.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
