'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { submitNewsletterSignup } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'

const FOOTER_LINKS = {
  Platform: [
    { key: 'footer.link.watch', href: '/watch' },
    { key: 'footer.link.coaching', href: '/coaching' },
    { key: 'footer.link.events', href: '/events' },
  ],
  Apply: [
    { key: 'footer.link.applyNow', href: '/apply' },
    { key: 'footer.link.dinner', href: '/dinner-with-alketa' },
    { key: 'footer.link.class', href: '/careers' },
    { key: 'footer.link.guest', href: '/apply' },
  ],
  Company: [
    { key: 'footer.link.about', href: '/about' },
    { key: 'footer.link.sponsorship', href: '/sponsorship' },
  ],
}

// While the site shows only Dinner with Alketa, hide the footer navigation
// columns. Flip to true to bring them back.
const SHOW_FOOTER_LINKS = false

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/grow__inspire_',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export function Footer() {
  const { t } = useI18n()
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState('')

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubError('')
    const result = await submitNewsletterSignup(email)
    if (result.ok) {
      setSubscribed(true)
    } else if (!result.ok && result.error === 'already_subscribed') {
      setSubscribed(true)
    } else {
      setSubError(t('footer.subError'))
    }
  }

  // Standalone internal pages render without the site chrome.
  if (pathname?.startsWith('/x7k9-aplikime')) return null

  return (
    <footer className="bg-brand-black text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Newsletter */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-serif text-xl font-bold text-brand-white mb-1">
                {t('footer.newsTitle')}
              </p>
              <p className="text-sm text-white/50">{t('footer.newsSub')}</p>
            </div>
            {subscribed ? (
              <p className="text-brand-gold text-sm font-medium">{t('footer.subscribed')}</p>
            ) : (
              <div>
                <form onSubmit={subscribe} className="flex gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className="flex-1 bg-white/8 border border-white/15 rounded-full px-5 py-3 text-sm text-brand-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                  >
                    {t('footer.subscribe')}
                  </button>
                </form>
                {subError && <p className="mt-2 text-red-400 text-xs">{subError}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className={`grid grid-cols-1 ${SHOW_FOOTER_LINKS ? 'md:grid-cols-4' : ''} gap-12 mb-12`}>
          <div className="col-span-1">
            <Image
              src="/logo-final.png"
              alt="Grow & Inspire by Alketa Vejsiu"
              width={240}
              height={240}
              className="h-24 w-auto object-contain mb-3"
            />
            <p className="text-sm leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <a
              href="mailto:marketing@classbyav.com"
              className="block text-sm text-brand-gold hover:text-brand-gold-light transition-colors"
            >
              marketing@classbyav.com
            </a>
            <a
              href="tel:+355692090234"
              className="block text-sm text-brand-gold hover:text-brand-gold-light transition-colors mb-6"
            >
              +355 69 209 0234
            </a>
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

          {SHOW_FOOTER_LINKS && Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{t(`footer.cat.${category}`)}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="text-sm hover:text-brand-white transition-colors">
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs hover:text-brand-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="text-xs hover:text-brand-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
