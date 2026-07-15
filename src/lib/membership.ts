import { createClient } from '@/lib/supabase/server'

export interface Membership {
  id: string
  tier: 'individual' | 'professional' | 'corporate'
  status: string
  started_at: string
  renews_at: string | null
  stripe_subscription_id: string | null
}

import type { Lang } from '@/lib/i18n'

const TIER_LABEL: Record<Lang, Record<Membership['tier'], string>> = {
  en: { individual: 'Individual', professional: 'Professional', corporate: 'Corporate' },
  sq: { individual: 'Individual', professional: 'Profesional', corporate: 'Korporativ' },
}

/** Localised name for the "no membership" state. */
export const freeTierLabel: Record<Lang, string> = { en: 'Free', sq: 'Falas' }

export function tierLabel(tier: Membership['tier'], lang: Lang = 'en'): string {
  return TIER_LABEL[lang][tier]
}

/**
 * Active membership for the logged-in user, or null.
 * Reads via the user's own session (RLS: "user read own membership").
 * Works whether the row was written by Stripe (B4) or inserted manually.
 */
export async function getMembership(): Promise<Membership | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('memberships')
    .select('id, tier, status, started_at, renews_at, stripe_subscription_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (data as Membership) ?? null
}

export async function isMember(): Promise<boolean> {
  return (await getMembership()) !== null
}
