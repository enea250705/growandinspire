'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, X, EyeOff } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'
import { createSeries, updateSeries, deleteSeries, type SeriesInput } from '@/lib/actions/admin'
import type { Series } from '@/types'

const EMPTY: SeriesInput = {
  title: '', description: '', thumbnail_url: '', sort_order: 0, is_published: true,
}

function toInput(s: Series): SeriesInput {
  return {
    title: s.title,
    description: s.description ?? '',
    thumbnail_url: s.thumbnail_url ?? '',
    sort_order: s.sort_order,
    is_published: s.is_published,
  }
}

export function SeriesClient({ series }: { series: Series[] }) {
  const [rows, setRows] = useState(series)
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<SeriesInput>(EMPTY)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function openNew() {
    setForm(EMPTY)
    setEditing('new')
    setError('')
  }

  function openEdit(s: Series) {
    setForm(toInput(s))
    setEditing(s.id)
    setError('')
  }

  function set<K extends keyof SeriesInput>(k: K, v: SeriesInput[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function save() {
    setError('')
    startTransition(async () => {
      const res = editing === 'new' ? await createSeries(form) : await updateSeries(editing as string, form)
      if (res.ok) {
        setEditing(null)
        if (editing === 'new') {
          setRows((prev) => [
            { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...form } as Series,
            ...prev,
          ])
        } else {
          setRows((prev) => prev.map((r) => (r.id === editing ? { ...r, ...form } as Series : r)))
        }
      } else {
        setError(res.error)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Fshi këtë seri? Videot brenda saj nuk fshihen - vetëm shkëputen nga seria.')) return
    startTransition(async () => {
      const res = await deleteSeries(id)
      if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id))
      else setError(res.error)
    })
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          <Plus size={15} /> Shto Seri
        </button>
      </div>

      {editing && (
        <div className="bg-brand-white rounded-2xl border border-brand-gold/30 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-brand-black">{editing === 'new' ? 'Seri e Re' : 'Ndrysho Serinë'}</h2>
            <button onClick={() => setEditing(null)} className="p-1 hover:bg-black/5 rounded-full"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input label="Titulli" required value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Përshkrimi" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Thumbnail URL"
                placeholder="https://... (pa këtë, karta shfaqet me gradient)"
                value={form.thumbnail_url}
                onChange={(e) => set('thumbnail_url', e.target.value)}
              />
            </div>
            <Input
              label="Renditja"
              type="number"
              value={String(form.sort_order)}
              onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
            />
            <label className="flex items-center gap-2 mt-7">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} className="w-4 h-4 accent-brand-gold" />
              <span className="text-sm text-brand-black">E publikuar (e dukshme publikisht)</span>
            </label>
          </div>
          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          <div className="flex justify-end mt-5">
            <button
              onClick={save}
              disabled={pending}
              className="bg-brand-gold text-brand-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
            >
              {pending ? 'Duke ruajtur...' : 'Ruaj'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {rows.map((s) => (
          <div key={s.id} className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-brand-black text-sm truncate">{s.title}</p>
                {!s.is_published && (
                  <span className="flex items-center gap-1 text-[10px] text-black/40 bg-black/5 rounded-full px-2 py-0.5">
                    <EyeOff size={10} /> Draft
                  </span>
                )}
              </div>
              <p className="text-xs text-black/40 truncate">{s.description || 'Pa përshkrim'}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => openEdit(s)} className="p-2 rounded-full hover:bg-black/5 text-black/50" aria-label="Ndrysho">
                <Pencil size={14} />
              </button>
              <button onClick={() => remove(s.id)} className="p-2 rounded-full hover:bg-red-50 text-red-400" aria-label="Fshi">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-black/40 py-8 text-center">Ende asnjë seri. Shto një për të grupuar videot.</p>}
      </div>
    </>
  )
}
