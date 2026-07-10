import { createAdminClient } from '@/lib/supabase/admin'
import { Mail, Phone } from 'lucide-react'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function list(v: unknown): string {
  return Array.isArray(v) && v.length ? v.join(', ') : '-'
}

export default async function AdminSignupsPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('membership_signups')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = data ?? []

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Membership Signups</h1>
        <p className="text-black/50">Kush u bashkua nga forma &ldquo;Join the Circle&rdquo;.</p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8 text-black/40">
          Nuk ka regjistrime ende.
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="bg-brand-white rounded-2xl border border-black/8 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-brand-black">
                    {[r.first_name, r.last_name].filter(Boolean).join(' ')}
                    {r.newsletter && (
                      <span className="ml-2 text-[10px] font-semibold text-brand-gold-dark bg-brand-gold/15 border border-brand-gold/25 px-2 py-0.5 rounded-full">
                        Newsletter
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm mt-1">
                    <a href={`mailto:${r.email}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                      <Mail size={12} /> {r.email}
                    </a>
                    {r.phone && (
                      <a href={`tel:${r.phone}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                        <Phone size={12} /> {r.phone}
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-black/30">{fmt(r.created_at)}</p>
              </div>

              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border-t border-black/6 pt-4">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">Profesioni</dt>
                  <dd className="text-sm text-black/70">{r.profession || '-'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">Industria</dt>
                  <dd className="text-sm text-black/70">{r.industry || '-'}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">Interests</dt>
                  <dd className="text-sm text-black/70">{list(r.interests)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">Objektivi kryesor</dt>
                  <dd className="text-sm text-black/70">{list(r.main_objective)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-widest text-black/40">Si mësuan</dt>
                  <dd className="text-sm text-black/70">{r.how_heard || '-'}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
