import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin'
import { AdminsClient, type AdminRow } from './AdminsClient'

export default async function AdminAdminsPage() {
  const supabase = createAdminClient()
  const me = await getAdminUser()

  const [{ data: adminRows }, { data: userList }] = await Promise.all([
    supabase.from('admins').select('user_id, created_at').order('created_at'),
    supabase.auth.admin.listUsers(),
  ])

  const emailById = new Map((userList?.users ?? []).map((u) => [u.id, u.email ?? '']))

  const rows: AdminRow[] = (adminRows ?? []).map((a) => ({
    user_id: a.user_id,
    email: emailById.get(a.user_id) ?? '(unknown)',
    isSelf: a.user_id === me?.id,
  }))

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Admins</h1>
        <p className="text-black/50">Kush ka akses në panelin admin.</p>
      </div>
      <AdminsClient rows={rows} />
    </>
  )
}
