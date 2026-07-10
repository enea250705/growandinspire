'use client'

import { useState, useTransition } from 'react'
import { Bookmark } from 'lucide-react'
import { toggleSaved } from '@/lib/actions/saved'

/**
 * Bookmark toggle for a content item. Only rendered for logged-in members —
 * the server gates on session, and a logged-out click would hit a silent RLS
 * failure. `initialSaved` comes from the server so first paint is correct.
 */
export function SaveButton({ contentId, initialSaved }: { contentId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved)
  const [pending, start] = useTransition()

  function onClick() {
    // Optimistic flip; revert if the action reports failure.
    const next = !saved
    setSaved(next)
    start(async () => {
      const res = await toggleSaved(contentId)
      if (!res.ok) setSaved(!next)
      else setSaved(res.saved)
    })
  }

  return (
    <button
      onClick={onClick}
      disabled={pending}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors disabled:opacity-60 ${
        saved
          ? 'bg-brand-gold/15 border-brand-gold/40 text-brand-gold-dark'
          : 'bg-brand-white border-black/15 text-black/60 hover:border-brand-gold/40'
      }`}
    >
      <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
      {saved ? 'E ruajtur' : 'Ruaje'}
    </button>
  )
}
