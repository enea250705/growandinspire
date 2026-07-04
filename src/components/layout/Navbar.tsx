'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="INSPIRE podCLASS by Alketa Vejsiu"
            width={160}
            height={53}
            className="h-10 w-auto object-contain"
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
          <Link href="/login" className="text-sm text-white/70 hover:text-brand-white transition-colors">
            Log In
          </Link>
          <Link
            href="/membership"
            className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium hover:bg-brand-gold-light transition-colors"
          >
            Join the Circle
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-brand-white"
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
            <Link href="/login" className="text-sm text-white/70 hover:text-brand-white transition-colors py-1">
              Log In
            </Link>
            <Link
              href="/membership"
              className="text-sm bg-brand-gold text-brand-black px-4 py-2 rounded-full font-medium text-center hover:bg-brand-gold-light transition-colors"
            >
              Join the Circle
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
