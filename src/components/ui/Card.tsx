import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark'
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border',
        {
          'bg-brand-white border-black/8 shadow-sm': variant === 'default',
          'bg-brand-dark border-white/10': variant === 'dark',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
