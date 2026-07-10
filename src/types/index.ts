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

/**
 * Public shape of a content item. `youtube_id` is deliberately absent: anon and
 * authenticated roles have no column privilege on it (see the
 * 20260710120000_protect_premium_video_ids migration). Use `has_video` to decide
 * whether an item is playable, and fetch the ID via getPlayableYoutubeId() only
 * after the membership gate passes.
 */
export interface ContentItem {
  id: string
  type: ContentType
  title: string
  description: string
  thumbnail_url: string | null
  is_premium: boolean
  published_at: string
  has_video: boolean
  /** Series this video belongs to, or null if it stands alone. */
  series_id: string | null
  /** Order within the series (1-based). Null when not in a series. */
  episode_number: number | null
}

/** Admin-only shape. Read with the service role. */
export interface AdminContentItem extends ContentItem {
  youtube_id: string | null
}

/** A series / program: an ordered container of content_items. */
export interface Series {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  sort_order: number
  is_published: boolean
  created_at: string
}

/** A series with its videos attached, ordered by episode_number. */
export interface SeriesWithVideos extends Series {
  videos: ContentItem[]
}

/** A downloadable member resource (worksheet, PDF, template). */
export interface Download {
  id: string
  title: string
  description: string | null
  file_url: string
  is_premium: boolean
  sort_order: number
  created_at: string
}

export interface JobPosition {
  id: string
  title: string
  department: string | null
  location: string | null
  employment_type: string | null
  description: string | null
  /** One requirement per line. */
  requirements: string | null
  is_open: boolean
  sort_order: number
  created_at: string
}

export interface MembershipPlan {
  id: string
  label: string
  /** Shown verbatim after the € sign; kept as text (e.g. '29'). */
  price: string
  period: string
  description: string | null
  /** One feature per line. */
  features: string | null
  cta: string
  cta_href: string
  badge: string | null
  highlight: boolean
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface ComparisonFeature {
  id: string
  feature: string
  /** membership_plans.id values that get a check on this row. */
  included_plan_ids: string[]
  sort_order: number
  created_at: string
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
