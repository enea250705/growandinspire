import { createAdminClient } from '@/lib/supabase/admin'
import { RegistrationsClient, type AdminRegistration } from './RegistrationsClient'

function j(v: unknown): string | null {
  if (Array.isArray(v)) return v.length ? v.join(', ') : null
  return (v as string) ?? null
}

export default async function AdminRegistrationsPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('event_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  const items: AdminRegistration[] = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name || [r.first_name, r.last_name].filter(Boolean).join(' '),
    email: r.email,
    phone: r.phone,
    status: r.status,
    created_at: r.created_at,
    details: {
      Kompania: r.company,
      Pozicioni: r.position,
      Industria: r.industry,
      Qyteti: r.city,
      Paketa: r.package,
      Interesat: j(r.interests),
      'Networking goals': r.networking_goals,
      'Merr pjesë në': j(r.participation),
    },
  }))

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Event Registrations</h1>
        <p className="text-black/50">Kush u regjistrua për evente. Ndrysho statusin këtu.</p>
      </div>
      <RegistrationsClient items={items} />
    </>
  )
}
