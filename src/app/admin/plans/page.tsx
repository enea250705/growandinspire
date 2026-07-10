import { createAdminClient } from '@/lib/supabase/admin'
import { PlansClient } from './PlansClient'
import type { MembershipPlan } from '@/types'

export default async function AdminPlansPage() {
  // Service role: admins must see unpublished plans too, which RLS hides from
  // the public.
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('membership_plans')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Planet e anëtarësisë</h1>
        <p className="text-black/50">
          Kartat e çmimeve te <code className="text-xs">/membership</code>. Ndrysho çmimin, emrin,
          përfitimet, shto ose fshi plane. Tabela krahasuese poshtë tyre mbetet e njëjtë.
        </p>
      </div>
      <PlansClient rows={(data ?? []) as MembershipPlan[]} />
    </>
  )
}
