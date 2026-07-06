import { createClient } from '@/lib/supabase/server'

export interface Membership {
  id: string
  tier: 'individual' | 'professional' | 'corporate'
  status: string
  started_at: string
  renews_at: string | null
  stripe_subscription_id: string | null
}

const TIER_LABEL: Record<Membership['tier'], string> = {
  individual: 'Individual',
  professional: 'Professional',
  corporate: 'Corporate',
}

export function tierLabel(tier: Membership['tier']): string {
  return TIER_LABEL[tier]
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
