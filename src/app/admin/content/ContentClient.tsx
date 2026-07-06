'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Lock, X } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'
import { createContent, updateContent, deleteContent, type ContentInput } from '@/lib/actions/admin'
import type { ContentItem } from '@/types'

const TYPE_OPTIONS = [
  { label: 'Inspire Podcast', value: 'podcast' },
  { label: 'Meet the Founder', value: 'founder' },
  { label: 'Meet the Artist', value: 'artist' },
  { label: 'Class Business', value: 'business' },
  { label: 'Revista Class', value: 'revista' },
  { label: 'Grow Exclusive', value: 'exclusive' },
]

const EMPTY: ContentInput = {
  type: 'podcast', title: '', description: '', youtube_id: '', is_premium: false, published_at: '',
}

function toInput(item: ContentItem): ContentInput {
  return {
    type: item.type,
    title: item.title,
    description: item.description ?? '',
    youtube_id: item.youtube_id ?? '',
    is_premium: item.is_premium,
    published_at: item.published_at.slice(0, 10),
  }
}

export function ContentClient({ items }: { items: ContentItem[] }) {
  const [rows, setRows] = useState(items)
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [form, setForm] = useState<ContentInput>(EMPTY)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function openNew() {
    setForm({ ...EMPTY, published_at: new Date().toISOString().slice(0, 10) })
    setEditing('new')
    setError('')
  }

  function openEdit(item: ContentItem) {
    setForm(toInput(item))
    setEditing(item.id)
    setError('')
  }

  function set<K extends keyof ContentInput>(k: K, v: ContentInput[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function save() {
    setError('')
    startTransition(async () => {
      const payload = { ...form, published_at: form.published_at ? new Date(form.published_at).toISOString() : '' }
      const res = editing === 'new' ? await createContent(payload) : await updateContent(editing as string, payload)
      if (res.ok) {
        setEditing(null)
        // optimistic refresh: reload from server on next navigation; here we mutate local
        if (editing === 'new') {
          setRows((prev) => [{ id: crypto.randomUUID(), thumbnail_url: null, ...payload } as ContentItem, ...prev])
        } else {
          setRows((prev) => prev.map((r) => (r.id === editing ? { ...r, ...payload } as ContentItem : r)))
        }
      } else {
        setError(res.error)
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Fshi këtë njësi përmbajtjeje?')) return
    startTransition(async () => {
      const res = await deleteContent(id)
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
          <Plus size={15} /> Shto Përmbajtje
        </button>
      </div>

      {editing && (
        <div className="bg-brand-white rounded-2xl border border-brand-gold/30 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-brand-black">{editing === 'new' ? 'Përmbajtje e Re' : 'Ndrysho Përmbajtjen'}</h2>
            <button onClick={() => setEditing(null)} className="p-1 hover:bg-black/5 rounded-full"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Kategoria" options={TYPE_OPTIONS} value={form.type} onChange={(e) => set('type', e.target.value)} />
            <Input label="YouTube ID" placeholder="dQw4w9WgXcQ" value={form.youtube_id} onChange={(e) => set('youtube_id', e.target.value)} />
            <div className="sm:col-span-2">
              <Input label="Titulli" required value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Përshkrimi" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <Input label="Data e publikimit" type="date" value={form.published_at} onChange={(e) => set('published_at', e.target.value)} />
            <label className="flex items-center gap-2 mt-7">
              <input type="checkbox" checked={form.is_premium} onChange={(e) => set('is_premium', e.target.checked)} className="w-4 h-4 accent-brand-gold" />
              <span className="text-sm text-brand-black">Premium (vetëm anëtarë)</span>
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
        {rows.map((item) => (
          <div key={item.id} className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-brand-gold text-[10px] font-semibold uppercase tracking-widest">{item.type}</span>
                {item.is_premium && <Lock size={10} className="text-brand-gold" />}
              </div>
              <p className="font-semibold text-brand-black text-sm truncate">{item.title}</p>
              <p className="text-xs text-black/30">{item.published_at.slice(0, 10)}{item.youtube_id ? ` · ${item.youtube_id}` : ''}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 rounded-full hover:bg-black/5 text-black/50" aria-label="Ndrysho">
                <Pencil size={14} />
              </button>
              <button onClick={() => remove(item.id)} className="p-2 rounded-full hover:bg-red-50 text-red-400" aria-label="Fshi">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
