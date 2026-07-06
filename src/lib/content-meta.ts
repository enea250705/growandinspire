import type { ContentType } from '@/types'

// Static, non-DB config. Safe to import in client and server components.

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

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
