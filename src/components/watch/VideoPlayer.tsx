'use client'

import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  youtubeId: string
  title?: string
}

export function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<unknown>(null)

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

  return (
    <div ref={containerRef} className="w-full aspect-video rounded-2xl overflow-hidden bg-brand-black">
      <div
        className="plyr-video"
        data-plyr-provider="youtube"
        data-plyr-embed-id={youtubeId}
        aria-label={title}
      />
    </div>
  )
}
