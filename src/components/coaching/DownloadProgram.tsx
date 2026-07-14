'use client'

import { useState } from 'react'
import { Download, Check } from 'lucide-react'
import { submitCoachingProgramRequest } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const T: Record<Lang, { error: string; sent: string; emailPh: string; sending: string; send: string; cancel: string; download: string }> = {
  en: {
    error: 'Something went wrong. Please try again.',
    sent: 'Program sent! Check your email.',
    emailPh: 'Your email',
    sending: 'Sending…',
    send: 'Send the Program',
    cancel: 'Cancel',
    download: 'Download the Program',
  },
  sq: {
    error: 'Diçka shkoi keq. Provo përsëri.',
    sent: 'Programi u dërgua! Kontrollo email-in tënd.',
    emailPh: 'Email-i yt',
    sending: 'Duke dërguar…',
    send: 'Dërgo Programin',
    cancel: 'Anulo',
    download: 'Shkarko Programin',
  },
}

export function DownloadProgram() {
  const { lang } = useI18n()
  const t = T[lang]
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    setError('')
    const res = await submitCoachingProgramRequest(email)
    setLoading(false)
    if (res.ok) setSent(true)
    else setError(t.error)
  }

  if (sent) {
    return (
      <div className="flex items-center gap-3 bg-brand-gold/15 border border-brand-gold/30 rounded-2xl px-6 py-4">
        <Check size={18} className="text-brand-gold shrink-0" />
        <p className="text-sm text-brand-black font-medium">
          {t.sent}
        </p>
      </div>
    )
  }

  if (open) {
    return (
      <div className="flex flex-col gap-2">
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPh}
            className="flex-1 border border-black/15 rounded-full px-5 py-3 text-sm bg-brand-white placeholder:text-black/30 focus:outline-none focus:border-brand-gold transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap disabled:opacity-60"
          >
            <Download size={14} />
            {loading ? t.sending : t.send}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-black/40 hover:text-black/70 px-2"
          >
            {t.cancel}
          </button>
        </form>
        {error && <p className="text-sm text-red-500 px-2">{error}</p>}
      </div>
    )
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
    >
      <Download size={15} />
      {t.download}
    </button>
  )
}
