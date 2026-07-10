import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DASHBOARD_NAV } from '@/components/dashboard/navItems'
import { isAdmin } from '@/lib/admin'
import { getMembership, tierLabel } from '@/lib/membership'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const name = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Member'
  const email = user?.email ?? ''
  const [membership, admin] = await Promise.all([getMembership(), isAdmin()])
  const tier = membership ? tierLabel(membership.tier) : 'Free'

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:hidden mb-6 overflow-x-auto">
          <nav className="flex gap-2 pb-1">
            {DASHBOARD_NAV.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-black/8 bg-brand-white px-3 py-2 text-sm text-black/60 hover:border-brand-gold/30 hover:text-brand-black"
              >
                <Icon size={14} strokeWidth={1.5} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <DashboardSidebar name={name} email={email} tier={tier} isAdmin={admin} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
