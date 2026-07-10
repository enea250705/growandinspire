import { createClient } from '@supabase/supabase-js'
import type { MembershipPlan } from '@/types'

// Cookieless anon client — membership_plans has public-read RLS on published
// rows, so /membership stays ISR (mirrors lib/settings.ts).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

// The three current plans, used as a fallback when the table is missing, empty,
// or the query errors — so /membership never renders zero plans (e.g. before the
// migration is run). Kept in sync with the migration seed.
export const FALLBACK_PLANS: MembershipPlan[] = [
  {
    id: 'individual', label: 'Individual', price: '29', period: '/ month',
    description: 'For individuals ready to grow personally and professionally.',
    features: [
      'Full Learning Hub access',
      'Grow Exclusive content library',
      'Monthly live Q&A with Alketa',
      '4 business events per year',
      'Community network access',
      'Downloadable guides and templates',
    ].join('\n'),
    cta: 'Get Started', cta_href: '/login', badge: null, highlight: false,
    is_published: true, sort_order: 0, created_at: '',
  },
  {
    id: 'professional', label: 'Professional', price: '79', period: '/ month',
    description: 'For professionals and small business owners scaling up.',
    features: [
      'Everything in Individual',
      'Priority event registration',
      'Coaching group access (quarterly)',
      'Business Growth Plan template',
      'Direct community introductions',
      'Early access to new content',
      'Dinner with Alketa - application priority',
    ].join('\n'),
    cta: 'Get Started', cta_href: '/login', badge: 'Most Popular', highlight: true,
    is_published: true, sort_order: 1, created_at: '',
  },
  {
    id: 'corporate', label: 'Corporate', price: '199', period: '/ month',
    description: 'For companies investing in team leadership and brand presence.',
    features: [
      'Everything in Professional',
      'Up to 5 team members',
      'Sponsorship partnership options',
      'Speaking slot consideration (conference)',
      'Co-branding opportunities',
      'Dedicated onboarding call',
      'Quarterly business review with Alketa',
    ].join('\n'),
    cta: 'Contact Us', cta_href: '/sponsorship', badge: null, highlight: false,
    is_published: true, sort_order: 2, created_at: '',
  },
]

/** Published plans for the public /membership page. Falls back to FALLBACK_PLANS. */
export async function getPublishedPlans(): Promise<MembershipPlan[]> {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error || !data || data.length === 0) return FALLBACK_PLANS
  return data as MembershipPlan[]
}

/** Split a stored features blob (one per line) into a clean list. */
export function planFeatures(features: string | null): string[] {
  return (features ?? '')
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
}
