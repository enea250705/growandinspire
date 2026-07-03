export type MembershipTier = 'individual' | 'professional' | 'corporate'
export type MembershipStatus = 'active' | 'cancelled' | 'past_due' | 'trialing'

export type ContentType = 'podcast' | 'founder' | 'artist' | 'business' | 'revista' | 'exclusive'

export type ApplicationType = 'job' | 'guest' | 'investment'

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface Membership {
  id: string
  user_id: string
  tier: MembershipTier
  status: MembershipStatus
  started_at: string
  renews_at: string
  stripe_subscription_id: string | null
}

export interface ContentItem {
  id: string
  type: ContentType
  title: string
  description: string
  youtube_id: string | null
  thumbnail_url: string | null
  is_premium: boolean
  published_at: string
}

export interface Event {
  id: string
  title: string
  type: 'conference' | 'coaching_group' | 'networking' | 'other'
  description: string
  date_start: string
  date_end: string | null
  price_eur: number | null
  location: string | null
  capacity: number | null
}

export interface DinnerApplication {
  id: string
  name: string
  email: string
  phone: string
  profession: string
  reason: string
  social_link: string | null
  status: ApplicationStatus
  created_at: string
}

export interface Application {
  id: string
  type: ApplicationType
  name: string
  email: string
  payload: Record<string, unknown>
  status: ApplicationStatus
  created_at: string
}

export interface SponsorshipLead {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string | null
  interest_area: string
  budget: string | null
  message: string
  created_at: string
}
