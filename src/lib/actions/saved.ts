'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

type ToggleResult = { ok: true; saved: boolean } | { ok: false; error: string }

/**
 * Bookmark or un-bookmark a content item for the logged-in user.
 * RLS enforces auth.uid() = user_id, so a logged-out caller is rejected here
 * rather than trusted. Returns the new saved state for optimistic UI.
 */
export async function toggleSaved(contentId: string): Promise<ToggleResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'not_authenticated' }

  const { data: existing } = await supabase
    .from('saved_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('content_id', contentId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase.from('saved_items').delete().eq('id', existing.id)
    if (error) return { ok: false, error: error.message }
    revalidatePath('/dashboard/saved')
    return { ok: true, saved: false }
  }

  const { error } = await supabase
    .from('saved_items')
    .insert({ user_id: user.id, content_id: contentId })
  if (error) return { ok: false, error: error.message }
  revalidatePath('/dashboard/saved')
  return { ok: true, saved: true }
}
