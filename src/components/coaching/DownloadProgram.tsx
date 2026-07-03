'use client'

import { useState } from 'react'
import { Download, Check } from 'lucide-react'

export function DownloadProgram() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    /* TODO: POST /api/coaching-program-request */
  }

  if (sent) {
    return (
      <div className="flex items-center gap-3 bg-brand-gold/15 border border-brand-gold/30 rounded-2xl px-6 py-4">
        <Check size={18} className="text-brand-gold shrink-0" />
        <p className="text-sm text-brand-black font-medium">
          Programi u dërgua! Kontrollo email-in tënd.
        </p>
      </div>
    )
  }

  if (open) {
    return (
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email-i yt"
          className="flex-1 border border-black/15 rounded-full px-5 py-3 text-sm bg-brand-white placeholder:text-black/30 focus:outline-none focus:border-brand-gold transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap"
        >
          <Download size={14} />
          Dërgo Programin
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-black/40 hover:text-black/70 px-2"
        >
          Anulo
        </button>
      </form>
    )
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
    >
      <Download size={15} />
      Shkarko Programin
    </button>
  )
}
