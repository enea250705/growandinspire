import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors rounded-full disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-brand-gold text-brand-black hover:bg-brand-gold-light': variant === 'gold',
          'bg-brand-black text-brand-white hover:bg-brand-dark': variant === 'primary',
          'border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white': variant === 'outline',
          'text-brand-black hover:bg-black/10': variant === 'ghost',
        },
        {
          'text-xs px-3 py-1.5': size === 'sm',
          'text-sm px-5 py-2.5': size === 'md',
          'text-base px-7 py-3.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
