'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Play, X } from 'lucide-react'
import { VideoPlayer } from '@/components/watch/VideoPlayer'

export interface OtherVideo {
  key: string
  title: string
  category: string
  thumb: string | null
  /** Present for free videos → plays inline; null for premium → links out. */
  youtubeId: string | null
  href: string
}

function Card({ video }: { video: OtherVideo }) {
  return (
    <>
      <div className="relative aspect-video overflow-hidden bg-brand-dark">
        {video.thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-brand-black/35 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-brand-black/45 ring-1 ring-white/40 flex items-center justify-center opacity-90 transition-all duration-300 group-hover:bg-brand-gold group-hover:ring-brand-gold group-hover:opacity-100 group-hover:scale-110">
            <Play size={18} className="text-brand-white ml-0.5 transition-colors group-hover:text-brand-black" fill="currentColor" strokeWidth={0} />
          </div>
        </div>
      </div>
      <div className="p-3.5">
        <p className="text-brand-white text-sm font-medium leading-snug line-clamp-2 mb-1.5 group-hover:text-brand-gold transition-colors">
          {video.title}
        </p>
        <p className="text-brand-gold/70 text-[10px] font-semibold uppercase tracking-[0.15em]">
          {video.category}
        </p>
      </div>
    </>
  )
}

export function OtherVideos({ videos }: { videos: OtherVideo[] }) {
  const [active, setActive] = useState<OtherVideo | null>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  function open(video: OtherVideo) {
    setActive(video)
    // Let the player mount, then bring it into view.
    requestAnimationFrame(() => playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  const cardClass =
    'group text-left rounded-2xl border border-white/10 bg-brand-dark overflow-hidden shadow-lg shadow-black/20 transition-all duration-300 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40'

  return (
    <>
      {active?.youtubeId && (
        <div ref={playerRef} className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <VideoPlayer youtubeId={active.youtubeId} title={active.title} />
            </div>
            <div className="lg:col-span-2">
              <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest block mb-2">{active.category}</span>
              <h3 className="font-serif text-2xl lg:text-3xl text-brand-white font-medium mb-4">{active.title}</h3>
              <button
                onClick={() => setActive(null)}
                className="inline-flex items-center gap-2 text-white/50 hover:text-brand-white text-sm transition-colors"
              >
                <X size={15} /> Mbyll
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {videos.map((video) =>
          video.youtubeId ? (
            <button
              key={video.key}
              type="button"
              onClick={() => open(video)}
              className={`${cardClass} ${active?.key === video.key ? 'border-brand-gold/60 ring-1 ring-brand-gold/40' : ''}`}
            >
              <Card video={video} />
            </button>
          ) : (
            <Link key={video.key} href={video.href} className={cardClass}>
              <Card video={video} />
            </Link>
          ),
        )}
      </div>
    </>
  )
}
