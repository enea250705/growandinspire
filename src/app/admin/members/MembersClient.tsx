'use client'

import { useState, useTransition } from 'react'
import { UserPlus, Mail } from 'lucide-react'
import { Input, Select } from '@/components/ui/FormField'
import { grantMembership, revokeMembership } from '@/lib/actions/admin'

export interface AdminMembership {
  id: string
  email: string
  tier: string
  status: string
  started_at: string
  renews_at: string | null
}

const TIERS = [
  { label: 'Individual', value: 'individual' },
  { label: 'Professional', value: 'professional' },
  { label: 'Corporate', value: 'corporate' },
]

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function MembersClient({ rows }: { rows: AdminMembership[] }) {
  const [email, setEmail] = useState('')
  const [tier, setTier] = useState('professional')
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function grant() {
    setMessage(null)
    startTransition(async () => {
      const res = await grantMembership(email, tier as 'individual' | 'professional' | 'corporate')
      if (res.ok) {
        setMessage({ ok: true, text: `Anëtarësi u dha për ${email}. Rifresko faqen.` })
        setEmail('')
      } else {
        setMessage({ ok: false, text: res.error })
      }
    })
  }

  function revoke(id: string) {
    if (!confirm('Hiq këtë anëtarësi?')) return
    startTransition(async () => {
      await revokeMembership(id)
      setMessage({ ok: true, text: 'Anëtarësia u hoq. Rifresko faqen.' })
    })
  }

  const active = rows.filter((r) => r.status === 'active')
  const inactive = rows.filter((r) => r.status !== 'active')

  return (
    <>
      {/* Grant form */}
      <div className="bg-brand-white rounded-2xl border border-black/8 p-6 mb-8">
        <h2 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
          <UserPlus size={16} className="text-brand-gold" /> Jep Anëtarësi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px_auto] gap-4 items-end">
          <Input label="Email i përdoruesit" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select label="Niveli" options={TIERS} value={tier} onChange={(e) => setTier(e.target.value)} />
          <button
            onClick={grant}
            disabled={pending || !email}
            className="bg-brand-black text-brand-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 h-fit"
          >
            {pending ? '...' : 'Jep'}
          </button>
        </div>
        <p className="text-xs text-black/40 mt-2">Përdoruesi duhet të jetë regjistruar së pari.</p>
        {message && (
          <p className={`text-sm mt-3 ${message.ok ? 'text-green-600' : 'text-red-500'}`}>{message.text}</p>
        )}
      </div>

      {/* Active members */}
      <p className="text-xs text-black/40 uppercase tracking-widest mb-3">Anëtarë aktivë ({active.length})</p>
      {active.length === 0 ? (
        <div className="text-center py-10 bg-brand-white rounded-2xl border border-black/8 text-black/40 mb-8">
          Nuk ka anëtarë aktivë.
        </div>
      ) : (
        <div className="space-y-2 mb-8">
          {active.map((m) => (
            <div key={m.id} className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-brand-black text-sm flex items-center gap-2">
                  <Mail size={12} className="text-black/30" /> {m.email}
                </p>
                <p className="text-xs text-black/40 mt-0.5">
                  <span className="text-brand-gold font-semibold uppercase">{m.tier}</span> · që nga {fmt(m.started_at)}
                </p>
              </div>
              <button
                onClick={() => revoke(m.id)}
                disabled={pending}
                className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                Hiq
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Past memberships */}
      {inactive.length > 0 && (
        <>
          <p className="text-xs text-black/40 uppercase tracking-widest mb-3">Të mëparshme ({inactive.length})</p>
          <div className="space-y-2">
            {inactive.map((m) => (
              <div key={m.id} className="bg-brand-white/60 rounded-xl border border-black/6 p-4 flex items-center justify-between gap-4 opacity-70">
                <div>
                  <p className="font-medium text-black/60 text-sm">{m.email}</p>
                  <p className="text-xs text-black/30 mt-0.5">{m.tier} · {m.status}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
