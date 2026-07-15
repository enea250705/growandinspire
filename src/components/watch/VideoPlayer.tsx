'use client'

import { useEffect, useRef, useState } from 'react'
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
  // The `.plyr` element Plyr builds; it's what actually goes fullscreen. All
  // gestures are bound to it and the hint is portaled into it, so both keep
  // working in fullscreen.
  const [plyrRoot, setPlyrRoot] = useState<HTMLElement | null>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
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
        // hl + cc_lang_pref pin the player to Albanian (the original audio) so
        // YouTube doesn't auto-dub/translate into the viewer's language, and
        // cc_load_policy:0 keeps auto-translated captions from loading.
        youtube: { noCookie: true, rel: 0, hl: 'sq', cc_lang_pref: 'sq', cc_load_policy: 0 },
      }) as unknown as PlyrLike

      playerRef.current = plyrInstance

      // For a YouTube embed the `.plyr` wrapper is built asynchronously, so grab
      // it on `ready` (and eagerly, in case it already exists).
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

  // Touch gestures on the player: double-tap a side to seek 10s (like YouTube),
  // single tap toggles play, and a downward swipe leaves fullscreen. All of it
  // rides the container's own touch events, which fire reliably even though the
  // YouTube surface sits above our overlay.
  useEffect(() => {
    const root = plyrRoot
    if (!root) return

    let startX = 0
    let startY = 0
    let tracking = false
    let lastTap: { side: 'left' | 'right'; time: number } | null = null
    let singleTimer: ReturnType<typeof setTimeout> | null = null

    const showHint = (side: 'left' | 'right') => {
      setSkipHint(side === 'left' ? 'back' : 'forward')
      if (hintTimer.current) clearTimeout(hintTimer.current)
      hintTimer.current = setTimeout(() => setSkipHint(null), 550)
    }

    const onStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      // Leave Plyr's own controls (progress bar, buttons) to Plyr.
      if (e.touches.length !== 1 || target.closest('.plyr__controls') || target.closest('.plyr__control')) {
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
      const player = playerRef.current
      const fullscreen = player?.fullscreen

      // A clear downward drag (mostly vertical) dismisses fullscreen.
      if (fullscreen?.active && dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) {
        e.preventDefault()
        fullscreen.exit()
        return
      }

      // Otherwise, treat a near-stationary touch as a tap.
      if (Math.hypot(dx, dy) >= 12) return
      // Stop Plyr's click-to-play firing too; we drive play/seek ourselves.
      e.preventDefault()

      const rect = root.getBoundingClientRect()
      const side: 'left' | 'right' = t.clientX - rect.left < rect.width / 2 ? 'left' : 'right'
      const now = Date.now()

      if (lastTap && lastTap.side === side && now - lastTap.time < 300) {
        if (singleTimer) {
          clearTimeout(singleTimer)
          singleTimer = null
        }
        lastTap = null
        if (side === 'left') player?.rewind(10)
        else player?.forward(10)
        showHint(side)
        return
      }

      lastTap = { side, time: now }
      if (singleTimer) clearTimeout(singleTimer)
      singleTimer = setTimeout(() => {
        player?.togglePlay()
        singleTimer = null
        lastTap = null
      }, 300)
    }

    root.addEventListener('touchstart', onStart, { passive: true })
    root.addEventListener('touchend', onEnd, { passive: false })
    return () => {
      if (singleTimer) clearTimeout(singleTimer)
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

  // Seek indicator + watermark, rendered inside the `.plyr` element so they stay
  // visible when the player is fullscreen. Both are non-interactive.
  const overlay = (
    <>
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
