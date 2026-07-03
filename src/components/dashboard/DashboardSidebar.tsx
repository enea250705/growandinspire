'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Calendar, Download, Users, Settings, LogOut, LayoutDashboard, FileText } from 'lucide-react'

const MOCK_USER = { name: 'Anisa', tier: 'Premium Access' }

const NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'My Membership', href: '/dashboard/membership', icon: Users },
  { label: 'Saved Content', href: '/dashboard/saved', icon: BookOpen },
  { label: 'My Downloads', href: '/dashboard/downloads', icon: Download },
  { label: 'My Applications', href: '/dashboard/applications', icon: FileText },
  { label: 'Upcoming Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
        <div className="p-6 border-b border-black/6">
          <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-3">
            <span className="font-serif font-bold text-brand-gold text-lg">{MOCK_USER.name[0]}</span>
          </div>
          <p className="font-semibold text-brand-black">{MOCK_USER.name}</p>
          <p className="text-xs text-brand-gold font-medium mt-0.5">{MOCK_USER.tier}</p>
        </div>

        <nav className="p-2">
          {NAV.map(({ label, href, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? 'bg-brand-black text-brand-white'
                    : 'text-black/60 hover:text-brand-black hover:bg-black/5'
                }`}
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-2 pt-0 border-t border-black/6 mt-2">
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 w-full transition-colors">
            <LogOut size={15} strokeWidth={1.5} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  )
}
