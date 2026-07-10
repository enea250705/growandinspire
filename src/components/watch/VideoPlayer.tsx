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

interface PlyrLike {
  rewind: (seekTime?: number) => void
  forward: (seekTime?: number) => void
  togglePlay: () => void
  destroy?: () => void
}

export function VideoPlayer({ youtubeId, title, watermark }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlyrLike | null>(null)
  const [posIndex, setPosIndex] = useState(0)
  const [skipHint, setSkipHint] = useState<null | 'back' | 'forward'>(null)
  const lastTapRef = useRef<{ side: 'left' | 'right'; time: number } | null>(null)
  const singleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Double-tap a side to seek 10s (like YouTube); a lone tap toggles play.
  function handleZoneTap(side: 'left' | 'right') {
    const player = playerRef.current
    const now = Date.now()
    const last = lastTapRef.current

    if (last && last.side === side && now - last.time < 300) {
      if (singleTapTimer.current) {
        clearTimeout(singleTapTimer.current)
        singleTapTimer.current = null
      }
      lastTapRef.current = null
      if (side === 'left') player?.rewind(10)
      else player?.forward(10)
      setSkipHint(side === 'left' ? 'back' : 'forward')
      if (hintTimer.current) clearTimeout(hintTimer.current)
      hintTimer.current = setTimeout(() => setSkipHint(null), 550)
      return
    }

    lastTapRef.current = { side, time: now }
    if (singleTapTimer.current) clearTimeout(singleTapTimer.current)
    singleTapTimer.current = setTimeout(() => {
      player?.togglePlay()
      singleTapTimer.current = null
      lastTapRef.current = null
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (singleTapTimer.current) clearTimeout(singleTapTimer.current)
      if (hintTimer.current) clearTimeout(hintTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    let plyrInstance: PlyrLike | null = null

    async function initPlayer() {
      const Plyr = (await import('plyr')).default
      await import('plyr/dist/plyr.css')

      const el = containerRef.current?.querySelector('.plyr-video')
      if (!el) return

      plyrInstance = new Plyr(el as HTMLElement, {
        controls: ['play-large', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        seekTime: 10,
        youtube: { noCookie: true, rel: 0 },
      }) as unknown as PlyrLike

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
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-black select-none
        [&_.plyr]:absolute [&_.plyr]:inset-0 [&_.plyr]:h-full [&_.plyr]:w-full
        [&_.plyr__video-wrapper]:h-full [&_.plyr__video-embed]:h-full [&_iframe]:absolute [&_iframe]:inset-0"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="plyr-video"
        data-plyr-provider="youtube"
        data-plyr-embed-id={youtubeId}
        aria-label={title}
      />

      {/* Double-tap seek zones: left rewinds, right fast-forwards 10s.
          The center column and bottom control bar stay clear for Plyr. */}
      <button
        type="button"
        aria-label="Rewind 10 seconds"
        className="absolute left-0 top-0 bottom-16 w-[35%] z-20 touch-none select-none bg-transparent"
        onClick={() => handleZoneTap('left')}
      />
      <button
        type="button"
        aria-label="Forward 10 seconds"
        className="absolute right-0 top-0 bottom-16 w-[35%] z-20 touch-none select-none bg-transparent"
        onClick={() => handleZoneTap('right')}
      />
      {skipHint && (
        <div
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-4 py-2 text-white text-sm font-semibold backdrop-blur-sm transition-opacity ${
            skipHint === 'back' ? 'left-[8%]' : 'right-[8%]'
          }`}
        >
          {skipHint === 'back' ? '« 10s' : '10s »'}
        </div>
      )}

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
