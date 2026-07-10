import { createAdminClient } from '@/lib/supabase/admin'
import { JobsClient } from './JobsClient'
import type { JobPosition } from '@/types'

export default async function AdminJobsPage() {
  // Service role: admins must see closed positions too, which RLS hides from
  // the public.
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('job_positions')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Pozicionet e punës</h1>
        <p className="text-black/50">
          Pozicionet e hapura shfaqen te <code className="text-xs">/careers</code> dhe në listën e
          aplikimit. Të mbyllurat nuk i sheh askush përveç teje.
        </p>
      </div>
      <JobsClient rows={(data ?? []) as JobPosition[]} />
    </>
  )
}
