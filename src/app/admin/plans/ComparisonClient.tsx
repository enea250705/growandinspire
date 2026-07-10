'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { Input } from '@/components/ui/FormField'
import {
  createFeature,
  updateFeature,
  deleteFeature,
  type ComparisonFeatureInput,
} from '@/lib/actions/admin'
import type { ComparisonFeature, MembershipPlan } from '@/types'

export function ComparisonClient({ rows, plans }: { rows: ComparisonFeature[]; plans: MembershipPlan[] }) {
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [feature, setFeature] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [ids, setIds] = useState<string[]>([])
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  const planLabel = (id: string) => plans.find((p) => p.id === id)?.label ?? '-'

  function openNew() {
    setFeature(''); setSortOrder(rows.length); setIds([]); setEditing('new'); setError('')
  }
  function openEdit(r: ComparisonFeature) {
    setFeature(r.feature); setSortOrder(r.sort_order); setIds(r.included_plan_ids ?? []); setEditing(r.id); setError('')
  }
  function togglePlan(id: string) {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function save() {
    setError('')
    const input: ComparisonFeatureInput = { feature, included_plan_ids: ids, sort_order: sortOrder }
    startTransition(async () => {
      const res = editing === 'new'
        ? await createFeature(input)
        : await updateFeature(editing as string, input)
      if (res.ok) setEditing(null)
      else setError(res.error)
    })
  }

  function remove(r: ComparisonFeature) {
    if (!confirm(`Fshi rreshtin "${r.feature}"?`)) return
    startTransition(async () => { await deleteFeature(r.id) })
  }

  return (
    <>
      <button
        onClick={openNew}
        className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors mb-6"
      >
        <Plus size={15} /> Shto veçori
      </button>

      {editing && (
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-brand-black">
              {editing === 'new' ? 'Veçori e re' : 'Ndrysho veçorinë'}
            </h3>
            <button onClick={() => setEditing(null)} className="text-black/30 hover:text-brand-black">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Veçoria" required value={feature} onChange={(e) => setFeature(e.target.value)} placeholder="Learning Hub" />
            <Input label="Renditja" type="number" value={String(sortOrder)} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} />
          </div>

          <p className="text-sm font-medium text-brand-black mt-5 mb-2">Përfshihet në planet:</p>
          {plans.length === 0 ? (
            <p className="text-sm text-black/40">Asnjë plan. Shto plane më lart së pari.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {plans.map((p) => {
                const on = ids.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlan(p.id)}
                    className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-full border transition-colors ${
                      on
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-black'
                        : 'border-black/15 text-black/50 hover:border-black/30'
                    }`}
                  >
                    {on && <Check size={13} className="text-brand-gold" strokeWidth={3} />}
                    {p.label}
                  </button>
                )
              })}
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={save}
              disabled={pending || !feature.trim()}
              className="bg-brand-gold text-brand-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
            >
              {pending ? 'Duke ruajtur...' : 'Ruaj'}
            </button>
            <button onClick={() => setEditing(null)} className="text-sm text-black/40 hover:text-brand-black">
              Anulo
            </button>
          </div>
          <p className="text-xs text-black/40 mt-3">Rifresko faqen për të parë ndryshimet.</p>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="text-center py-10 bg-brand-white rounded-2xl border border-black/8 text-black/40">
          Asnjë veçori. Shto një ose rifresko pasi të kesh ekzekutuar SQL-in.
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-brand-black text-sm">{r.feature}</p>
                <p className="text-xs text-black/40 mt-0.5">
                  {r.included_plan_ids.length
                    ? r.included_plan_ids.map(planLabel).join(' · ')
                    : 'Asnjë plan'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEdit(r)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                >
                  <Pencil size={12} /> Ndrysho
                </button>
                <button
                  onClick={() => remove(r)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-red-100 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={12} /> Fshi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
