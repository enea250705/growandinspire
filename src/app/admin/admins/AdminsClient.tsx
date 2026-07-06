'use client'

import { useState, useTransition } from 'react'
import { UserCog, Mail, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/FormField'
import { addAdmin, removeAdmin } from '@/lib/actions/admin'

export interface AdminRow {
  user_id: string
  email: string
  isSelf: boolean
}

export function AdminsClient({ rows }: { rows: AdminRow[] }) {
  const [list, setList] = useState(rows)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function add() {
    setMessage(null)
    startTransition(async () => {
      const res = await addAdmin(email)
      if (res.ok) {
        setMessage({ ok: true, text: `${email} u shtua si admin. Rifresko faqen.` })
        setEmail('')
      } else {
        setMessage({ ok: false, text: res.error })
      }
    })
  }

  function remove(userId: string) {
    if (!confirm('Hiq këtë admin?')) return
    startTransition(async () => {
      const res = await removeAdmin(userId)
      if (res.ok) setList((prev) => prev.filter((r) => r.user_id !== userId))
      else setMessage({ ok: false, text: res.error })
    })
  }

  return (
    <>
      <div className="bg-brand-white rounded-2xl border border-black/8 p-6 mb-8">
        <h2 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
          <UserCog size={16} className="text-brand-gold" /> Shto Admin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
          <Input label="Email i përdoruesit" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button
            onClick={add}
            disabled={pending || !email}
            className="bg-brand-black text-brand-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 h-fit"
          >
            {pending ? '...' : 'Shto'}
          </button>
        </div>
        <p className="text-xs text-black/40 mt-2">Përdoruesi duhet të jetë regjistruar së pari.</p>
        {message && <p className={`text-sm mt-3 ${message.ok ? 'text-green-600' : 'text-red-500'}`}>{message.text}</p>}
      </div>

      <div className="space-y-2">
        {list.map((a) => (
          <div key={a.user_id} className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-brand-gold" />
              <div>
                <p className="font-semibold text-brand-black text-sm flex items-center gap-2">
                  <Mail size={12} className="text-black/30" /> {a.email}
                  {a.isSelf && <span className="text-[10px] bg-brand-gold/15 text-brand-gold-dark px-2 py-0.5 rounded-full">ti</span>}
                </p>
              </div>
            </div>
            <button
              onClick={() => remove(a.user_id)}
              disabled={pending}
              className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Hiq
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
