'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sendPasswordReset } from '@/lib/actions/auth'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  subtitle: string
  checkTitle: string
  sentPre: string
  sentPost: string
  backToLogin: string
  title: string
  desc: string
  email: string
  sending: string
  send: string
  remember: string
  logIn: string
}> = {
  en: {
    subtitle: 'Reset your password',
    checkTitle: 'Check your email',
    sentPre: 'We sent a password reset link to ',
    sentPost: '. Check your inbox.',
    backToLogin: 'Back to login',
    title: 'Forgot your password?',
    desc: 'Enter your email and we will send you a reset link.',
    email: 'Email',
    sending: 'Sending...',
    send: 'Send Reset Link',
    remember: 'Remember your password? ',
    logIn: 'Log in',
  },
  sq: {
    subtitle: 'Rivendos fjalëkalimin',
    checkTitle: 'Kontrollo email-in',
    sentPre: 'Dërguam një lidhje rivendosjeje te ',
    sentPost: '. Kontrollo inbox-in.',
    backToLogin: 'Kthehu te hyrja',
    title: 'Harrove fjalëkalimin?',
    desc: 'Shkruaj email-in dhe do të dërgojmë një lidhje për ta rivendosur.',
    email: 'Email',
    sending: 'Duke dërguar...',
    send: 'Dërgo Lidhjen',
    remember: 'E mban mend fjalëkalimin? ',
    logIn: 'Hyr',
  },
}

export default function ForgotPasswordPage() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await sendPasswordReset(email)
    setLoading(false)
    if (result.ok) {
      setSent(true)
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center">
            <Image
              src="/logo-final.png"
              alt="Grow & Inspire by Alketa Vejsiu"
              width={240}
              height={240}
              className="h-28 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-white/40 text-sm mt-2">{c.subtitle}</p>
        </div>

        <div className="bg-brand-white rounded-2xl p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="font-serif text-xl font-bold text-brand-black mb-2">{c.checkTitle}</h2>
              <p className="text-black/50 text-sm mb-6">
                {c.sentPre}<strong>{email}</strong>{c.sentPost}
              </p>
              <Link href="/login" className="text-brand-gold text-sm font-medium hover:underline">
                {c.backToLogin}
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-xl font-bold text-brand-black mb-2">{c.title}</h2>
              <p className="text-black/50 text-sm mb-6">{c.desc}</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-black">{c.email}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
                >
                  {loading ? c.sending : c.send}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          {c.remember}
          <Link href="/login" className="text-brand-gold hover:underline">{c.logIn}</Link>
        </p>
      </div>
    </div>
  )
}
