import type { ContentItem, ContentType } from '@/types'

export const MOCK_CONTENT: ContentItem[] = [
  // Podcast
  {
    id: '1',
    type: 'podcast',
    title: 'The New Era of Leadership',
    description: 'Alketa explores what it means to lead in 2026 - vulnerability, vision, and velocity.',
    youtube_id: 'qp0HIF3SfI4',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-05-10T10:00:00Z',
  },
  {
    id: '2',
    type: 'podcast',
    title: 'Building with Purpose',
    description: 'How the most successful Albanian entrepreneurs align mission with profit.',
    youtube_id: 'arj7oStGLkU',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-04-22T10:00:00Z',
  },
  {
    id: '3',
    type: 'podcast',
    title: 'Mindset Before Strategy',
    description: 'Premium episode: the inner work that unlocks outer results.',
    youtube_id: 'Ks-_Mh1QhMc',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-04-01T10:00:00Z',
  },
  // Meet the Founder
  {
    id: '4',
    type: 'founder',
    title: 'The Pivot That Changed Everything',
    description: "Founder of Tirana's fastest-growing tech startup on his $0 to $2M journey.",
    youtube_id: 'c0KYU2j0TM4',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-05-01T10:00:00Z',
  },
  {
    id: '5',
    type: 'founder',
    title: 'Building a Brand from Scratch',
    description: 'How she turned a personal passion into a regional fashion label.',
    youtube_id: 'iCvmsMzlF7o',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-03-15T10:00:00Z',
  },
  // Meet the Artist
  {
    id: '6',
    type: 'artist',
    title: 'Art as a Business',
    description: 'Albanian painter on selling internationally and protecting creative integrity.',
    youtube_id: 'H14bBuluwB8',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-04-10T10:00:00Z',
  },
  {
    id: '7',
    type: 'artist',
    title: 'The Creative Process Unpacked',
    description: 'Premium session: deep dive into how top creatives structure their work.',
    youtube_id: 'qp0HIF3SfI4',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-03-20T10:00:00Z',
  },
  // Class Business
  {
    id: '8',
    type: 'business',
    title: 'Scaling in Emerging Markets',
    description: 'Three frameworks for sustainable growth when capital is scarce.',
    youtube_id: 'arj7oStGLkU',
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-05-05T10:00:00Z',
  },
  {
    id: '9',
    type: 'business',
    title: 'Financial Literacy for Founders',
    description: 'Premium: cash flow, burn rate, and runway explained for non-CFOs.',
    youtube_id: 'Ks-_Mh1QhMc',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-04-18T10:00:00Z',
  },
  // Revista Class
  {
    id: '10',
    type: 'revista',
    title: 'Women Redefining Albanian Business',
    description: 'Our annual feature on the women shaping the economy from the inside.',
    youtube_id: null,
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-05-12T10:00:00Z',
  },
  {
    id: '11',
    type: 'revista',
    title: 'The Future of Tirana',
    description: 'Urban growth, investment corridors, and what it means for entrepreneurs.',
    youtube_id: null,
    thumbnail_url: null,
    is_premium: false,
    published_at: '2026-04-05T10:00:00Z',
  },
  // Grow Exclusive
  {
    id: '12',
    type: 'exclusive',
    title: 'Confidence Shifts',
    description: 'Members-only coaching session on building unshakeable professional confidence.',
    youtube_id: 'c0KYU2j0TM4',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-05-08T10:00:00Z',
  },
  {
    id: '13',
    type: 'exclusive',
    title: 'The Power of Focus',
    description: "Deep work strategies from Alketa's private coaching library.",
    youtube_id: 'iCvmsMzlF7o',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-04-25T10:00:00Z',
  },
  {
    id: '14',
    type: 'exclusive',
    title: 'Business Growth Plan',
    description: 'Step-by-step template walkthrough - live session recording.',
    youtube_id: 'H14bBuluwB8',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-03-30T10:00:00Z',
  },
  {
    id: '15',
    type: 'exclusive',
    title: 'Mindset Shifts',
    description: 'Breaking the patterns that keep smart people stuck.',
    youtube_id: 'qp0HIF3SfI4',
    thumbnail_url: null,
    is_premium: true,
    published_at: '2026-03-10T10:00:00Z',
  },
]

export const CATEGORY_META: Record<ContentType, { label: string; slug: string; description: string }> = {
  podcast: {
    label: 'Inspire Podcast',
    slug: 'podcast',
    description: 'Conversations with leaders, founders, and creatives shaping Albania and beyond.',
  },
  founder: {
    label: 'Meet the Founder',
    slug: 'meet-the-founder',
    description: 'Raw, unfiltered founder stories - the pivots, the failures, the breakthroughs.',
  },
  artist: {
    label: 'Meet the Artist',
    slug: 'meet-the-artist',
    description: 'Where creativity meets commerce. Albanian artists building global careers.',
  },
  business: {
    label: 'Class Business',
    slug: 'class-business',
    description: 'Frameworks, strategies, and insights for the modern business builder.',
  },
  revista: {
    label: 'Revista Class',
    slug: 'revista-class',
    description: 'Long-form articles and features from the Class Media editorial team.',
  },
  exclusive: {
    label: 'Grow Exclusive',
    slug: 'grow-exclusive',
    description: 'Members-only content. Coaching sessions, deep dives, and private recordings.',
  },
}

export const SLUG_TO_TYPE: Record<string, ContentType> = {
  podcast: 'podcast',
  'meet-the-founder': 'founder',
  'meet-the-artist': 'artist',
  'class-business': 'business',
  'revista-class': 'revista',
  'grow-exclusive': 'exclusive',
}

export function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getContentByType(type: ContentType): ContentItem[] {
  return MOCK_CONTENT.filter((c) => c.type === type)
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | undefined {
  return MOCK_CONTENT.find((c) => c.type === type && slugify(c.title) === slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
