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
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-white/10 to-brand-black">
        {video.thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-brand-black/50 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-gold group-hover:ring-brand-gold group-hover:scale-110">
            <Play size={20} className="text-brand-white ml-0.5 transition-colors group-hover:text-brand-black" fill="currentColor" strokeWidth={0} />
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-brand-black/60 backdrop-blur-sm text-white/80 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {video.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-brand-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
          {video.title}
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
