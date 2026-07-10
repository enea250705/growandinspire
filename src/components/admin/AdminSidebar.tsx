'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Megaphone, Calendar, Film, Users, Mail, ShieldCheck, Settings, UserCog, UserPlus } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Applications', href: '/admin/applications', icon: FileText },
  { label: 'Sponsorship Leads', href: '/admin/leads', icon: Megaphone },
  { label: 'Registrations', href: '/admin/registrations', icon: Calendar },
  { label: 'Membership Signups', href: '/admin/signups', icon: UserPlus },
  { label: 'Content', href: '/admin/content', icon: Film },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Users', href: '/admin/users', icon: UserCog },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Mail },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  { label: 'Admins', href: '/admin/admins', icon: ShieldCheck },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
        <div className="p-6 border-b border-black/6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-brand-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Admin</span>
          </div>
          <p className="text-xs text-black/40 truncate">{email}</p>
        </div>

        <nav className="p-2">
          {NAV.map(({ label, href, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? 'bg-brand-black text-brand-white' : 'text-black/60 hover:text-brand-black hover:bg-black/5'
                }`}
              >
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-2 pt-0 border-t border-black/6 mt-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-black/50 hover:bg-black/5 transition-colors"
          >
            ← Back to app
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 w-full transition-colors"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
