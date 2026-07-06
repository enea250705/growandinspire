import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const name = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Member'
  const email = user?.email ?? ''
  const tier = 'Member'

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <DashboardSidebar name={name} email={email} tier={tier} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
