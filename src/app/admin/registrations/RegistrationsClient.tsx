'use client'

import { useState, useTransition } from 'react'
import { Mail, Phone } from 'lucide-react'
import { setRegistrationStatus } from '@/lib/actions/admin'

export interface AdminRegistration {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  created_at: string
  details?: Record<string, string | null>
}

const STATUSES = ['pending', 'confirmed', 'paid', 'cancelled'] as const

const STYLE: Record<string, string> = {
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  confirmed: 'text-green-700 bg-green-50 border-green-200',
  paid: 'text-green-700 bg-green-50 border-green-200',
  cancelled: 'text-red-500 bg-red-50 border-red-200',
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function RegistrationsClient({ items }: { items: AdminRegistration[] }) {
  const [rows, setRows] = useState(items)
  const [pending, startTransition] = useTransition()

  function change(id: string, status: (typeof STATUSES)[number]) {
    startTransition(async () => {
      const res = await setRegistrationStatus(id, status)
      if (res.ok) setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    })
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8 text-black/40">
        Nuk ka regjistrime ende.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="bg-brand-white rounded-2xl border border-black/8 p-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-brand-black">{r.name}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STYLE[r.status] ?? STYLE.pending}`}>
                {r.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${r.email}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                <Mail size={12} /> {r.email}
              </a>
              {r.phone && (
                <a href={`tel:${r.phone}`} className="text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                  <Phone size={12} /> {r.phone}
                </a>
              )}
            </div>
            <p className="text-xs text-black/30 mt-1">Regjistruar {fmt(r.created_at)}</p>
            {r.details && Object.values(r.details).some(Boolean) && (
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 max-w-lg">
                {Object.entries(r.details)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-widest text-black/40">{k}</dt>
                      <dd className="text-sm text-black/70 break-words">{v}</dd>
                    </div>
                  ))}
              </dl>
            )}
          </div>

          <select
            value={r.status}
            onChange={(e) => change(r.id, e.target.value as (typeof STATUSES)[number])}
            disabled={pending}
            className="text-sm border border-black/15 rounded-lg px-3 py-2 bg-brand-white focus:outline-none focus:border-brand-gold disabled:opacity-50"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
