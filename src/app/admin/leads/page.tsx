import { Mail, Phone, Building2 } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function AdminLeadsPage() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('sponsorship_leads').select('*').order('created_at', { ascending: false })
  const leads = data ?? []

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Sponsorship Leads</h1>
        <p className="text-black/50">Kërkesat për partneritet dhe sponsorizim.</p>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8 text-black/40">
          Nuk ka lead-e ende.
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-brand-white rounded-2xl border border-black/8 p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <p className="font-semibold text-brand-black flex items-center gap-2">
                    <Building2 size={15} className="text-brand-gold" /> {lead.company_name}
                  </p>
                  <p className="text-sm text-black/50 mt-0.5">{lead.contact_name}</p>
                </div>
                <div className="text-right">
                  {lead.budget && (
                    <span className="inline-block bg-brand-gold/10 text-brand-gold-dark text-xs font-semibold px-3 py-1 rounded-full">
                      {lead.budget}
                    </span>
                  )}
                  <p className="text-xs text-black/30 mt-1">{fmt(lead.created_at)}</p>
                </div>
              </div>

              {lead.interest_area && (
                <p className="text-xs text-black/40 uppercase tracking-widest mb-2">{lead.interest_area}</p>
              )}
              {lead.message && <p className="text-sm text-black/70 mb-3">{lead.message}</p>}

              <div className="flex flex-wrap gap-4 pt-3 border-t border-black/6 text-sm">
                <a href={`mailto:${lead.email}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                  <Mail size={13} /> {lead.email}
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                    <Phone size={13} /> {lead.phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
