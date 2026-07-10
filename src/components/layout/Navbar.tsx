'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useT } from '@/lib/i18n/provider'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

export function Navbar() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const NAV_LINKS = [
    { label: t.nav.learning, href: '/watch' },
    { label: t.nav.coaching, href: '/coaching' },
    { label: t.nav.events, href: '/events' },
    { label: t.nav.community, href: '/community' },
    { label: t.nav.careers, href: '/careers' },
    { label: t.nav.about, href: '/about' },
  ]

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session?.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-v2.png"
            alt="INSPIRE podCLASS by Alketa Vejsiu"
            width={244}
            height={122}
            className="h-8 lg:h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-brand-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher variant="dark" />
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors"
            >
              {t.nav.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-white/70 hover:text-brand-white transition-colors">
                {t.nav.logIn}
              </Link>
              <Link
                href="/membership"
                className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors"
              >
                {t.nav.joinCircle}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden text-brand-white p-2 -m-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brand-black border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/80 hover:text-brand-white transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-white/10">
            <div className="py-1">
              <LanguageSwitcher variant="dark" />
            </div>
            {loggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium text-center hover:bg-brand-gold-light transition-colors"
              >
                {t.nav.dashboard}
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-white/70 hover:text-brand-white transition-colors py-1">
                  {t.nav.logIn}
                </Link>
                <Link
                  href="/membership"
                  onClick={() => setOpen(false)}
                  className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium text-center hover:bg-brand-gold-light transition-colors"
                >
                  {t.nav.joinCircle}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
