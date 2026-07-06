'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  youtubeId: string
  title?: string
  /** Member identity shown as a moving watermark over the video.
      Wire this to the logged-in user's email once auth is live. */
  watermark?: string
}

const WATERMARK_POSITIONS = [
  'top-[8%] left-[6%]',
  'top-[12%] right-[8%]',
  'bottom-[18%] left-[10%]',
  'bottom-[10%] right-[6%]',
  'top-[45%] left-[40%]',
]

export function VideoPlayer({ youtubeId, title, watermark }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<unknown>(null)
  const [posIndex, setPosIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    let plyrInstance: { destroy?: () => void } | null = null

    async function initPlayer() {
      const Plyr = (await import('plyr')).default
      await import('plyr/dist/plyr.css')

      const el = containerRef.current?.querySelector('.plyr-video')
      if (!el) return

      plyrInstance = new Plyr(el as HTMLElement, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0 },
      })

      playerRef.current = plyrInstance
    }

    initPlayer()

    return () => {
      plyrInstance?.destroy?.()
    }
  }, [youtubeId])

  // move the watermark every 8s so it can't be cropped or masked out
  useEffect(() => {
    if (!watermark) return
    const id = setInterval(() => {
      setPosIndex((i) => (i + 1) % WATERMARK_POSITIONS.length)
    }, 8000)
    return () => clearInterval(id)
  }, [watermark])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-black select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="plyr-video"
        data-plyr-provider="youtube"
        data-plyr-embed-id={youtubeId}
        aria-label={title}
      />
      {watermark && (
        <div
          className={`pointer-events-none absolute z-10 ${WATERMARK_POSITIONS[posIndex]} text-white/25 text-xs font-medium tracking-wide transition-all duration-1000`}
        >
          {watermark}
        </div>
      )}
    </div>
  )
}
