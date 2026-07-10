'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import {
  createPosition,
  updatePosition,
  deletePosition,
  setPositionOpen,
  type JobPositionInput,
} from '@/lib/actions/admin'
import type { JobPosition } from '@/types'

const TYPE_OPTIONS = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Praktikë', value: 'Internship' },
  { label: 'Freelance', value: 'Freelance' },
]

const EMPTY: JobPositionInput = {
  title: '', department: '', location: 'Tiranë, Shqipëri', employment_type: 'Full-time',
  description: '', requirements: '', is_open: true, sort_order: 0,
}

function toInput(p: JobPosition): JobPositionInput {
  return {
    title: p.title,
    department: p.department ?? '',
    location: p.location ?? '',
    employment_type: p.employment_type ?? 'Full-time',
    description: p.description ?? '',
    requirements: p.requirements ?? '',
    is_open: p.is_open,
    sort_order: p.sort_order,
  }
}

export function JobsClient({ rows }: { rows: JobPosition[] }) {
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<JobPositionInput>(EMPTY)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function set<K extends keyof JobPositionInput>(k: K, v: JobPositionInput[K]) {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  function openNew() { setForm(EMPTY); setEditing('new'); setError('') }
  function openEdit(p: JobPosition) { setForm(toInput(p)); setEditing(p.id); setError('') }

  function save() {
    setError('')
    startTransition(async () => {
      const res = editing === 'new'
        ? await createPosition(form)
        : await updatePosition(editing as string, form)
      if (res.ok) setEditing(null)
      else setError(res.error)
    })
  }

  function remove(p: JobPosition) {
    if (!confirm(`Fshi përfundimisht "${p.title}"? Për ta hequr nga faqja pa e fshirë, përdor "Mbyll".`)) return
    startTransition(async () => { await deletePosition(p.id) })
  }

  function toggle(p: JobPosition) {
    startTransition(async () => { await setPositionOpen(p.id, !p.is_open) })
  }

  const open = rows.filter((r) => r.is_open)
  const closed = rows.filter((r) => !r.is_open)

  return (
    <>
      <button
        onClick={openNew}
        className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors mb-8"
      >
        <Plus size={15} /> Shto pozicion
      </button>

      {editing && (
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-brand-black">
              {editing === 'new' ? 'Pozicion i ri' : 'Ndrysho pozicionin'}
            </h2>
            <button onClick={() => setEditing(null)} className="text-black/30 hover:text-brand-black">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input label="Titulli" required value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Video Editor" />
            </div>
            <Input label="Departamenti" value={form.department} onChange={(e) => set('department', e.target.value)} placeholder="Produksion" />
            <Input label="Vendndodhja" value={form.location} onChange={(e) => set('location', e.target.value)} />
            <Select label="Lloji" options={TYPE_OPTIONS} value={form.employment_type} onChange={(e) => set('employment_type', e.target.value)} />
            <Input
              label="Renditja"
              type="number"
              value={String(form.sort_order)}
              onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
            />
            <div className="sm:col-span-2">
              <Textarea label="Përshkrimi" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Kërkesat (një për rresht)"
                rows={5}
                value={form.requirements}
                onChange={(e) => set('requirements', e.target.value)}
                placeholder={'2+ vite eksperiencë\nAdobe Premiere\nShqip dhe anglisht'}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4 text-sm text-brand-black cursor-pointer">
            <input type="checkbox" checked={form.is_open} onChange={(e) => set('is_open', e.target.checked)} />
            I hapur (shfaqet publikisht)
          </label>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={save}
              disabled={pending || !form.title.trim()}
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

      <Section title={`Të hapura (${open.length})`} rows={open} onEdit={openEdit} onToggle={toggle} onRemove={remove} pending={pending} />
      {closed.length > 0 && (
        <Section title={`Të mbyllura (${closed.length})`} rows={closed} onEdit={openEdit} onToggle={toggle} onRemove={remove} pending={pending} dim />
      )}
    </>
  )
}

function Section({
  title, rows, onEdit, onToggle, onRemove, pending, dim,
}: {
  title: string
  rows: JobPosition[]
  onEdit: (p: JobPosition) => void
  onToggle: (p: JobPosition) => void
  onRemove: (p: JobPosition) => void
  pending: boolean
  dim?: boolean
}) {
  return (
    <>
      <p className="text-xs text-black/40 uppercase tracking-widest mb-3">{title}</p>
      {rows.length === 0 ? (
        <div className="text-center py-10 bg-brand-white rounded-2xl border border-black/8 text-black/40 mb-8">
          Asnjë pozicion.
        </div>
      ) : (
        <div className="space-y-2 mb-8">
          {rows.map((p) => (
            <div
              key={p.id}
              className={`bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4 ${dim ? 'opacity-60' : ''}`}
            >
              <div className="min-w-0">
                <p className="font-semibold text-brand-black text-sm">{p.title}</p>
                <p className="text-xs text-black/40 mt-0.5">
                  {[p.department, p.location, p.employment_type].filter(Boolean).join(' · ') || '—'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onToggle(p)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                >
                  {p.is_open ? <><EyeOff size={12} /> Mbyll</> : <><Eye size={12} /> Hap</>}
                </button>
                <button
                  onClick={() => onEdit(p)}
                  disabled={pending}
                  className="flex items-center gap-1.5 text-xs font-medium border border-black/10 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors disabled:opacity-50"
                >
                  <Pencil size={12} /> Ndrysho
                </button>
                <button
                  onClick={() => onRemove(p)}
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
