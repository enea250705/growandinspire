import { createAdminClient } from '@/lib/supabase/admin'
import { PlansClient } from './PlansClient'
import { ComparisonClient } from './ComparisonClient'
import type { MembershipPlan, ComparisonFeature } from '@/types'

export default async function AdminPlansPage() {
  // Service role: admins must see unpublished plans too, which RLS hides from
  // the public.
  const supabase = createAdminClient()
  const [{ data: plans }, { data: features }] = await Promise.all([
    supabase
      .from('membership_plans')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
    supabase
      .from('comparison_features')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ])

  const planRows = (plans ?? []) as MembershipPlan[]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Planet e anëtarësisë</h1>
        <p className="text-black/50">
          Kartat e çmimeve te <code className="text-xs">/membership</code>. Ndrysho çmimin, emrin,
          përfitimet, shto ose fshi plane.
        </p>
      </div>
      <PlansClient rows={planRows} />

      <div className="mt-16 mb-8">
        <h2 className="font-serif text-2xl font-bold text-brand-black mb-1">What&apos;s Included (tabela krahasuese)</h2>
        <p className="text-black/50">
          Rreshtat e tabelës poshtë kartave. Për çdo veçori, zgjidh cilat plane e përfshijnë.
        </p>
      </div>
      <ComparisonClient rows={(features ?? []) as ComparisonFeature[]} plans={planRows} />
    </>
  )
}
