import { createAdminClient } from '@/lib/supabase/admin'
import { UsersClient, type AdminUser } from './UsersClient'
import { getAdminUser } from '@/lib/admin'

export default async function AdminUsersPage() {
  const actor = await getAdminUser()
  const supabase = createAdminClient()

  // listUsers() pages at 50 by default. Raised here; revisit if the site ever
  // passes a few hundred users, since this would silently truncate.
  const [{ data: userList }, { data: admins }, { data: memberships }] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    supabase.from('admins').select('user_id'),
    supabase.from('memberships').select('user_id, tier, status').eq('status', 'active'),
  ])

  const adminIds = new Set((admins ?? []).map((a) => a.user_id))
  const membershipByUser = new Map((memberships ?? []).map((m) => [m.user_id, m]))

  const users: AdminUser[] = (userList?.users ?? []).map((u) => {
    const m = membershipByUser.get(u.id)
    return {
      id: u.id,
      email: u.email ?? '(pa email)',
      full_name: (u.user_metadata?.full_name as string) ?? '',
      confirmed: !!u.email_confirmed_at,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      is_admin: adminIds.has(u.id),
      membership_tier: m?.tier ?? null,
    }
  })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Përdoruesit</h1>
        <p className="text-black/50">
          Të gjithë përdoruesit e regjistruar. Ndrysho fjalëkalimin, konfirmo emailin, jep ose hiq
          të drejta admini, fshi llogari.
        </p>
      </div>
      <UsersClient users={users} currentUserId={actor?.id ?? ''} adminCount={adminIds.size} />
    </>
  )
}
