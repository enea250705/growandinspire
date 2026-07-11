'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { label: 'Learning', href: '/watch' },
  { label: 'Coaching', href: '/coaching' },
  { label: 'Events', href: '/events' },
  { label: 'Community', href: '/community' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

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
            src="/logo-final.png"
            alt="Grow & Inspire by Alketa Vejsiu"
            width={240}
            height={240}
            className="h-14 lg:h-24 w-auto object-contain"
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
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-white/70 hover:text-brand-white transition-colors">
                Log In
              </Link>
              <Link
                href="/membership"
                className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors"
              >
                Join the Circle
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
            {loggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium text-center hover:bg-brand-gold-light transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-white/70 hover:text-brand-white transition-colors py-1">
                  Log In
                </Link>
                <Link
                  href="/membership"
                  onClick={() => setOpen(false)}
                  className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium text-center hover:bg-brand-gold-light transition-colors"
                >
                  Join the Circle
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
