'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, ShieldCheck } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'
import { DASHBOARD_NAV } from '@/components/dashboard/navItems'
import { useI18n } from '@/components/i18n/I18nProvider'

interface Props {
  name: string
  email: string
  tier: string
  isAdmin?: boolean
}

export function DashboardSidebar({ name, email, tier, isAdmin }: Props) {
  const { t } = useI18n()
  const pathname = usePathname()
  const initial = name[0]?.toUpperCase() ?? 'M'

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
        <div className="p-6 border-b border-black/6">
          <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-3">
            <span className="font-serif font-bold text-brand-gold text-lg">{initial}</span>
          </div>
          <p className="font-semibold text-brand-black">{name}</p>
          <p className="text-xs text-black/40 mt-0.5 truncate">{email}</p>
          <p className="text-xs text-brand-gold font-medium mt-1">{tier}</p>
        </div>

        <nav className="p-2">
          {DASHBOARD_NAV.map(({ key, href, icon: Icon, exact }) => {
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
                {t(key)}
              </Link>
            )
          })}
        </nav>

        {isAdmin && (
          <div className="p-2 pt-0">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm bg-brand-gold/10 text-brand-gold-dark hover:bg-brand-gold/20 transition-colors"
            >
              <ShieldCheck size={15} strokeWidth={1.5} />
              {t('dash.adminPanel')}
            </Link>
          </div>
        )}

        <div className="p-2 pt-0 border-t border-black/6 mt-2">
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 w-full transition-colors"
            >
              <LogOut size={15} strokeWidth={1.5} />
              {t('dash.signOut')}
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
