import { createAdminClient } from '@/lib/supabase/admin'
import { MembersClient, type AdminMembership } from './MembersClient'

export default async function AdminMembersPage() {
  const supabase = createAdminClient()

  const [{ data: memberships }, { data: userList }] = await Promise.all([
    supabase.from('memberships').select('id, user_id, tier, status, started_at, renews_at').order('started_at', { ascending: false }),
    supabase.auth.admin.listUsers(),
  ])

  const emailById = new Map((userList?.users ?? []).map((u) => [u.id, u.email ?? '']))

  const rows: AdminMembership[] = (memberships ?? []).map((m) => ({
    id: m.id,
    email: emailById.get(m.user_id) ?? '(unknown)',
    tier: m.tier,
    status: m.status,
    started_at: m.started_at,
    renews_at: m.renews_at,
  }))

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Members</h1>
        <p className="text-black/50">Jep ose hiq anëtarësi manualisht. (Deri sa Stripe të lidhet.)</p>
      </div>
      <MembersClient rows={rows} />
    </>
  )
}
