import { Lock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LockBadgeProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LockBadge({ className, size = 'md' }: LockBadgeProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center bg-brand-black/70 backdrop-blur-sm rounded-2xl',
        className
      )}
    >
      <Lock
        className="text-brand-gold mb-2"
        size={size === 'sm' ? 16 : 22}
        strokeWidth={1.5}
      />
      <p className="text-brand-white text-xs font-medium mb-3">Members only</p>
      <Link
        href="/membership"
        className="text-xs bg-brand-gold text-brand-black px-4 py-1.5 rounded-full font-semibold hover:bg-brand-gold-light transition-colors"
      >
        Join to unlock
      </Link>
    </div>
  )
}

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-brand-gold/15 text-brand-gold-dark text-xs font-semibold px-2 py-0.5 rounded-full">
      <Lock size={10} />
      PREMIUM
    </span>
  )
}
