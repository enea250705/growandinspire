'use client'

import { cn } from '@/lib/utils'

interface Tab {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 bg-black/5 p-1 rounded-full w-fit', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
            active === tab.value
              ? 'bg-brand-black text-brand-white shadow-sm'
              : 'text-black/60 hover:text-brand-black'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
