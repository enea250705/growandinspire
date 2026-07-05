'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Watch', href: '/watch' },
    { label: 'Coaching', href: '/coaching' },
    { label: 'Events', href: '/events' },
    { label: 'Membership', href: '/membership' },
  ],
  Apply: [
    { label: 'Apliko Tani', href: '/apply' },
    { label: 'Dinner with Alketa', href: '/dinner-with-alketa' },
    { label: 'Work with Class', href: '/apply' },
    { label: 'Become a Guest', href: '/apply' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Sponsorship', href: '/sponsorship' },
    { label: 'Insights', href: '/watch/revista-class' },
  ],
}

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    /* TODO: POST /api/newsletter */
  }

  return (
    <footer className="bg-brand-black text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Newsletter */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-serif text-xl font-bold text-brand-white mb-1">
                Insights that inspire action.
              </p>
              <p className="text-sm text-white/50">Get weekly insights delivered to your inbox.</p>
            </div>
            {subscribed ? (
              <p className="text-brand-gold text-sm font-medium">You&apos;re subscribed. Welcome to the circle.</p>
            ) : (
              <form onSubmit={subscribe} className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/8 border border-white/15 rounded-full px-5 py-3 text-sm text-brand-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Image
              src="/logo-v2.png"
              alt="INSPIRE podCLASS by Alketa Vejsiu"
              width={244}
              height={122}
              className="h-14 w-auto object-contain mb-3"
            />
            <p className="text-sm leading-relaxed mb-6">
              A premium platform for personal growth, business leadership, and meaningful connections.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ svg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-brand-white hover:border-white/40 transition-colors"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{category}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-brand-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© {new Date().getFullYear()} Grow and Inspire / Class Media. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs hover:text-brand-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs hover:text-brand-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
