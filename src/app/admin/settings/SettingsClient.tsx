'use client'

import { useState, useTransition } from 'react'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/FormField'
import { updateSettings } from '@/lib/actions/admin'

interface Def { key: string; label: string }

export function SettingsClient({ defs, initial }: { defs: Def[]; initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function set(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }))
  }

  function save() {
    setError('')
    setSaved(false)
    startTransition(async () => {
      const res = await updateSettings(values)
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <div className="bg-brand-white rounded-2xl border border-black/8 p-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defs.map((d) => (
          <Input key={d.key} label={d.label} value={values[d.key] ?? ''} onChange={(e) => set(d.key, e.target.value)} />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={save}
          disabled={pending}
          className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {saved ? <><Check size={14} /> Ruajtur</> : pending ? 'Duke ruajtur...' : 'Ruaj ndryshimet'}
        </button>
        <p className="text-xs text-black/40">Ndryshimet shfaqen në site brenda pak sekondash.</p>
      </div>
    </div>
  )
}
