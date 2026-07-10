'use client'

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'

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
  on?: (event: string, cb: () => void) => void
  elements?: { container?: HTMLElement | null }
  fullscreen?: { active: boolean; exit: () => void }
  destroy?: () => void
}

export function VideoPlayer({ youtubeId, title, watermark }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlyrLike | null>(null)
  const [posIndex, setPosIndex] = useState(0)
  const [skipHint, setSkipHint] = useState<null | 'back' | 'forward'>(null)
  // The `.plyr` element Plyr builds; it's what actually goes fullscreen, so we
  // portal our seek overlay into it to keep double-tap working in fullscreen.
  const [plyrRoot, setPlyrRoot] = useState<HTMLElement | null>(null)
  const lastTapRef = useRef<{ side: 'left' | 'right'; time: number } | null>(null)
  const singleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Double-tap a side to seek 10s (like YouTube); a lone tap toggles play.
  function handleZoneTap(e: ReactMouseEvent, side: 'left' | 'right') {
    // Keep the tap from also reaching Plyr's click-to-play surface underneath.
    e.stopPropagation()
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

      // For a YouTube embed the `.plyr` wrapper is built asynchronously, so grab
      // it on `ready` (and eagerly, in case it already exists) — the seek zones
      // and swipe handler are portaled into it and can't mount until it exists.
      const captureRoot = () => {
        const root =
          (plyrInstance?.elements?.container as HTMLElement | null) ??
          (containerRef.current?.querySelector('.plyr') as HTMLElement | null)
        if (root) setPlyrRoot(root)
      }
      plyrInstance.on?.('ready', captureRoot)
      captureRoot()
    }

    initPlayer()

    return () => {
      setPlyrRoot(null)
      plyrInstance?.destroy?.()
    }
  }, [youtubeId])

  // Swipe the video down to leave fullscreen, the way native video apps behave.
  useEffect(() => {
    const root = plyrRoot
    if (!root) return

    let startX = 0
    let startY = 0
    let tracking = false

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        tracking = false
        return
      }
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      tracking = true
    }

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return
      tracking = false
      const t = e.changedTouches[0]
      if (!t) return
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      const fullscreen = playerRef.current?.fullscreen
      // A clear downward drag (mostly vertical) dismisses fullscreen.
      if (fullscreen?.active && dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) {
        fullscreen.exit()
      }
    }

    root.addEventListener('touchstart', onStart, { passive: true })
    root.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      root.removeEventListener('touchstart', onStart)
      root.removeEventListener('touchend', onEnd)
    }
  }, [plyrRoot])

  // move the watermark every 8s so it can't be cropped or masked out
  useEffect(() => {
    if (!watermark) return
    const id = setInterval(() => {
      setPosIndex((i) => (i + 1) % WATERMARK_POSITIONS.length)
    }, 8000)
    return () => clearInterval(id)
  }, [watermark])

  // Seek overlay + watermark, rendered inside the `.plyr` element so they stay
  // on screen (and tappable) when the player is fullscreen.
  const overlay = (
    <>
      {/* Double-tap seek zones: left rewinds, right fast-forwards 10s.
          The center column and bottom control bar stay clear for Plyr. */}
      <button
        type="button"
        aria-label="Rewind 10 seconds"
        className="absolute left-0 top-0 bottom-16 w-[35%] z-20 touch-none select-none bg-transparent"
        onClick={(e) => handleZoneTap(e, 'left')}
      />
      <button
        type="button"
        aria-label="Forward 10 seconds"
        className="absolute right-0 top-0 bottom-16 w-[35%] z-20 touch-none select-none bg-transparent"
        onClick={(e) => handleZoneTap(e, 'right')}
      />
      {skipHint && (
        <div
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-4 py-2 text-white text-sm font-semibold backdrop-blur-sm ${
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
    </>
  )

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
      {plyrRoot && createPortal(overlay, plyrRoot)}
    </div>
  )
}
