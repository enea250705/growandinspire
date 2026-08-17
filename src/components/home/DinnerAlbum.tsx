'use client'

import { useEffect, useState } from 'react'

const IMAGES = ['/dinner-1.jpg', '/dinner-2.jpg', '/dinner-table-3.jpg']
const INTERVAL = 4000

export function DinnerAlbum() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), INTERVAL)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative rounded-3xl overflow-hidden h-52 sm:h-64 lg:h-80 shadow-sm bg-brand-dark">
      {IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="Dinner with Alketa"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {IMAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
