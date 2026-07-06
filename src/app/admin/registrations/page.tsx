import { createAdminClient } from '@/lib/supabase/admin'
import { RegistrationsClient, type AdminRegistration } from './RegistrationsClient'

export default async function AdminRegistrationsPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('event_registrations')
    .select('id, name, email, phone, status, created_at')
    .order('created_at', { ascending: false })

  const items = (data ?? []) as AdminRegistration[]

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
