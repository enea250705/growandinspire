'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Calendar, LayoutDashboard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useT } from '@/lib/i18n/provider'

export function MobileBottomNav() {
  const t = useT()
  const pathname = usePathname()
  const [loggedIn, setLoggedIn] = useState(false)

  const TABS = [
    { label: t.mobileNav.learningHub, href: '/watch', icon: BookOpen },
    { label: t.mobileNav.events, href: '/events', icon: Calendar },
    { label: t.mobileNav.dashboard, href: '/dashboard', icon: LayoutDashboard },
  ]

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session?.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!loggedIn) return null

  return (
    <>
      <div className="h-16 lg:hidden" />
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-white border-t border-black/10 safe-area-pb">
        <div className="grid grid-cols-3 h-16">
          {TABS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-brand-black' : 'text-black/35 hover:text-black/60'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-gold rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
