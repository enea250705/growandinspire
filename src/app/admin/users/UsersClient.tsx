'use client'

import { useState, useTransition } from 'react'
import { KeyRound, Trash2, ShieldCheck, ShieldOff, MailCheck, Search } from 'lucide-react'
import { Input } from '@/components/ui/FormField'
import {
  setUserPassword,
  deleteUser,
  confirmUserEmail,
  addAdmin,
  removeAdmin,
} from '@/lib/actions/admin'

export interface AdminUser {
  id: string
  email: string
  full_name: string
  confirmed: boolean
  created_at: string
  last_sign_in_at: string | null
  is_admin: boolean
  membership_tier: string | null
}

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function UsersClient({
  users,
  currentUserId,
  adminCount,
}: {
  users: AdminUser[]
  currentUserId: string
  adminCount: number
}) {
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [pwFor, setPwFor] = useState<string | null>(null)
  const [pw, setPw] = useState('')
  const [pending, startTransition] = useTransition()

  const shown = users.filter(
    (u) =>
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.full_name.toLowerCase().includes(query.toLowerCase())
  )

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, okText: string) {
    setMessage(null)
    startTransition(async () => {
      const res = await fn()
      setMessage(res.ok ? { ok: true, text: okText } : { ok: false, text: res.error ?? 'Gabim' })
    })
  }

  function savePassword(userId: string) {
    run(() => setUserPassword(userId, pw), 'Fjalëkalimi u ndryshua.')
    setPwFor(null)
    setPw('')
  }

  function remove(u: AdminUser) {
    if (!confirm(`Fshi përfundimisht ${u.email}? Kjo fshin edhe anëtarësinë e tij. Nuk kthehet mbrapsht.`)) return
    run(() => deleteUser(u.id), `${u.email} u fshi.`)
  }

  return (
    <>
      <div className="flex items-center gap-2 bg-brand-white rounded-xl border border-black/8 px-4 py-2.5 mb-6 max-w-md">
        <Search size={15} className="text-black/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kërko me email ose emër..."
          className="flex-1 text-sm focus:outline-none bg-transparent"
        />
      </div>

      {message && (
        <p
          className={`text-sm rounded-lg px-3 py-2 mb-4 ${
            message.ok ? 'text-green-700 bg-green-50 border border-green-100' : 'text-red-600 bg-red-50 border border-red-100'
          }`}
        >
          {message.text} <span className="text-black/40">Rifresko faqen për të parë ndryshimet.</span>
        </p>
      )}

      <p className="text-xs text-black/40 mb-3">
        {shown.length} përdorues · {adminCount} admin
      </p>

      <div className="space-y-3">
        {shown.map((u) => {
          const isSelf = u.id === currentUserId
          const isLastAdmin = u.is_admin && adminCount <= 1

          return (
            <div key={u.id} className="bg-brand-white rounded-xl border border-black/8 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-brand-black text-sm">{u.full_name || '(pa emër)'}</p>
                    {u.is_admin && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-brand-gold/15 text-brand-gold px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                    {u.membership_tier && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-black/5 text-black/50 px-2 py-0.5 rounded-full">
                        {u.membership_tier}
                      </span>
                    )}
                    {!u.confirmed && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                        I pakonfirmuar
                      </span>
                    )}
                    {isSelf && <span className="text-[10px] text-black/30">(ti)</span>}
                  </div>
                  <p className="text-sm text-black/60 mt-0.5 truncate">{u.email}</p>
                  <p className="text-xs text-black/35 mt-1">
                    Regjistruar {fmt(u.created_at)} · Hyrja e fundit {fmt(u.last_sign_in_at)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => { setPwFor(pwFor === u.id ? null : u.id); setPw('') }}
                    disabled={pending}
                    className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                  >
                    <KeyRound size={12} /> Fjalëkalimi
                  </button>

                  {!u.confirmed && (
                    <button
                      onClick={() => run(() => confirmUserEmail(u.id), 'Emaili u konfirmua.')}
                      disabled={pending}
                      className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                    >
                      <MailCheck size={12} /> Konfirmo
                    </button>
                  )}

                  {u.is_admin ? (
                    <button
                      onClick={() => run(() => removeAdmin(u.id), 'Të drejtat e adminit u hoqën.')}
                      disabled={pending || isLastAdmin}
                      title={isLastAdmin ? 'Nuk mund të heqësh adminin e fundit.' : undefined}
                      className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-black/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShieldOff size={12} /> Hiq admin
                    </button>
                  ) : (
                    <button
                      onClick={() => run(() => addAdmin(u.email), 'U bë admin.')}
                      disabled={pending}
                      className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                    >
                      <ShieldCheck size={12} /> Bëje admin
                    </button>
                  )}

                  <button
                    onClick={() => remove(u)}
                    disabled={pending || isSelf || isLastAdmin}
                    title={isSelf ? 'Nuk mund të fshish veten.' : isLastAdmin ? 'Nuk mund të fshish adminin e fundit.' : undefined}
                    className="flex items-center gap-1.5 text-xs font-medium border border-red-100 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={12} /> Fshi
                  </button>
                </div>
              </div>

              {pwFor === u.id && (
                <div className="mt-4 pt-4 border-t border-black/5 flex flex-wrap items-end gap-3">
                  <div className="flex-1 min-w-[220px]">
                    <Input
                      label={`Fjalëkalim i ri për ${u.email}`}
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="Të paktën 6 karaktere"
                    />
                  </div>
                  <button
                    onClick={() => savePassword(u.id)}
                    disabled={pending || pw.length < 6}
                    className="bg-brand-gold text-brand-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-gold-light transition-colors disabled:opacity-50"
                  >
                    Ruaj
                  </button>
                  <button
                    onClick={() => { setPwFor(null); setPw('') }}
                    className="text-sm text-black/40 px-3 py-2.5 hover:text-brand-black transition-colors"
                  >
                    Anulo
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
