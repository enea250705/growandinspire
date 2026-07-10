'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Star } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'
import {
  createPlan,
  updatePlan,
  deletePlan,
  setPlanPublished,
  type MembershipPlanInput,
} from '@/lib/actions/admin'
import type { MembershipPlan } from '@/types'

const EMPTY: MembershipPlanInput = {
  label: '', price: '0', period: '/ month', description: '', features: '',
  cta: 'Get Started', cta_href: '/login', badge: '', highlight: false,
  is_published: true, sort_order: 0,
}

function toInput(p: MembershipPlan): MembershipPlanInput {
  return {
    label: p.label,
    price: p.price,
    period: p.period,
    description: p.description ?? '',
    features: p.features ?? '',
    cta: p.cta,
    cta_href: p.cta_href,
    badge: p.badge ?? '',
    highlight: p.highlight,
    is_published: p.is_published,
    sort_order: p.sort_order,
  }
}

export function PlansClient({ rows }: { rows: MembershipPlan[] }) {
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<MembershipPlanInput>(EMPTY)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function set<K extends keyof MembershipPlanInput>(k: K, v: MembershipPlanInput[K]) {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  function openNew() {
    setForm({ ...EMPTY, sort_order: rows.length })
    setEditing('new')
    setError('')
  }
  function openEdit(p: MembershipPlan) { setForm(toInput(p)); setEditing(p.id); setError('') }

  function save() {
    setError('')
    startTransition(async () => {
      const res = editing === 'new'
        ? await createPlan(form)
        : await updatePlan(editing as string, form)
      if (res.ok) setEditing(null)
      else setError(res.error)
    })
  }

  function remove(p: MembershipPlan) {
    if (!confirm(`Fshi përfundimisht planin "${p.label}"? Për ta fshehur pa e fshirë, përdor "Fshih".`)) return
    startTransition(async () => { await deletePlan(p.id) })
  }

  function togglePublish(p: MembershipPlan) {
    startTransition(async () => { await setPlanPublished(p.id, !p.is_published) })
  }

  return (
    <>
      <button
        onClick={openNew}
        className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors mb-8"
      >
        <Plus size={15} /> Shto plan
      </button>

      {editing && (
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-brand-black">
              {editing === 'new' ? 'Plan i ri' : 'Ndrysho planin'}
            </h2>
            <button onClick={() => setEditing(null)} className="text-black/30 hover:text-brand-black">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Emri i planit" required value={form.label} onChange={(e) => set('label', e.target.value)} placeholder="Individual" />
            <Input label="Renditja" type="number" value={String(form.sort_order)} onChange={(e) => set('sort_order', Number(e.target.value) || 0)} />
            <Input label="Çmimi (pa €)" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="29" />
            <Input label="Periudha" value={form.period} onChange={(e) => set('period', e.target.value)} placeholder="/ month" />
            <div className="sm:col-span-2">
              <Textarea label="Përshkrimi" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Për individët që duan të rriten…" />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Përfitimet (një për rresht)"
                rows={6}
                value={form.features}
                onChange={(e) => set('features', e.target.value)}
                placeholder={'Full Learning Hub access\nGrow Exclusive content library\nMonthly live Q&A with Alketa'}
              />
            </div>
            <Input label="Teksti i butonit (CTA)" value={form.cta} onChange={(e) => set('cta', e.target.value)} placeholder="Get Started" />
            <Input label="Lidhja e butonit" value={form.cta_href} onChange={(e) => set('cta_href', e.target.value)} placeholder="/login" />
            <Input label="Etiketa (badge, opsionale)" value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="Most Popular" />
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm text-brand-black cursor-pointer">
              <input type="checkbox" checked={form.highlight} onChange={(e) => set('highlight', e.target.checked)} />
              I theksuar (karta e errët në mes)
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-black cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
              I publikuar (shfaqet publikisht)
            </label>
          </div>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={save}
              disabled={pending || !form.label.trim()}
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
          Asnjë plan. Shto një ose rifresko pasi të kesh ekzekutuar SQL-in.
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((p) => (
            <div
              key={p.id}
              className={`bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4 ${p.is_published ? '' : 'opacity-60'}`}
            >
              <div className="min-w-0">
                <p className="font-semibold text-brand-black text-sm flex items-center gap-1.5">
                  {p.label}
                  {p.highlight && <Star size={12} className="text-brand-gold fill-brand-gold" />}
                  {p.badge && <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{p.badge}</span>}
                </p>
                <p className="text-xs text-black/40 mt-0.5">€{p.price} {p.period}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => togglePublish(p)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                >
                  {p.is_published ? <><EyeOff size={12} /> Fshih</> : <><Eye size={12} /> Publiko</>}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                >
                  <Pencil size={12} /> Ndrysho
                </button>
                <button
                  onClick={() => remove(p)}
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
