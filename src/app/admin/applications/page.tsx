import { createAdminClient } from '@/lib/supabase/admin'
import { ApplicationsClient, type AdminApplication } from './ApplicationsClient'

export default async function AdminApplicationsPage() {
  const supabase = createAdminClient()

  const [dinner, apps] = await Promise.all([
    supabase.from('dinner_applications').select('*').order('created_at', { ascending: false }),
    supabase.from('applications').select('*').order('created_at', { ascending: false }),
  ])

  const items: AdminApplication[] = []

  for (const d of dinner.data ?? []) {
    items.push({
      id: d.id,
      source: 'dinner',
      kind: 'Dinner with Alketa',
      name: d.name,
      email: d.email,
      status: d.status,
      created_at: d.created_at,
      details: {
        Telefon: d.phone,
        Profesioni: d.profession,
        Arsyeja: d.reason,
        Social: d.social_link,
      },
    })
  }

  for (const a of apps.data ?? []) {
    items.push({
      id: a.id,
      source: 'application',
      kind: a.type === 'job' ? 'Work with Class' : a.type === 'guest' ? 'Become a Guest' : 'Idea / Investment',
      name: a.name,
      email: a.email,
      status: a.status,
      created_at: a.created_at,
      details: (a.payload ?? {}) as Record<string, string | null>,
    })
  }

  items.sort((x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime())

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Applications</h1>
        <p className="text-black/50">Shqyrto dhe aprovo aplikimet. Çdo aplikim rishikohet manualisht.</p>
      </div>
      <ApplicationsClient items={items} />
    </>
  )
}
