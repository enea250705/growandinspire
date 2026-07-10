import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  required?: boolean
  error?: string
  dark?: boolean
  children: React.ReactNode
}

export function FieldWrapper({ label, required, error, dark, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={cn('text-sm font-medium', dark ? 'text-brand-white' : 'text-brand-black')}>
        {label}
        {required && <span className="text-brand-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  dark?: boolean
}

export function Input({ label, required, error, dark, className, ...props }: InputProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} dark={dark}>
      <input
        className={cn(
          'border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors',
          dark
            ? 'bg-brand-black border-white/15 text-brand-white placeholder:text-white/25'
            : 'bg-brand-white border-black/15 text-brand-black placeholder:text-black/30',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
    </FieldWrapper>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  dark?: boolean
}

export function Textarea({ label, required, error, dark, className, ...props }: TextareaProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} dark={dark}>
      <textarea
        rows={4}
        className={cn(
          'border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none',
          dark
            ? 'bg-brand-black border-white/15 text-brand-white placeholder:text-white/25'
            : 'bg-brand-white border-black/15 text-brand-black placeholder:text-black/30',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
    </FieldWrapper>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  dark?: boolean
  options: { label: string; value: string }[]
}

export function Select({ label, required, error, dark, options, className, ...props }: SelectProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} dark={dark}>
      <select
        className={cn(
          'border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors',
          dark
            ? 'bg-brand-black border-white/15 text-brand-white'
            : 'bg-brand-white border-black/15 text-brand-black',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FieldWrapper>
  )
}

interface CheckboxGroupProps {
  label: string
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
  required?: boolean
  error?: string
  dark?: boolean
  columns?: 1 | 2 | 3
}

export function CheckboxGroup({ label, options, value, onChange, required, error, dark, columns = 2 }: CheckboxGroupProps) {
  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }
  const cols = columns === 3 ? 'sm:grid-cols-3' : columns === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'
  return (
    <FieldWrapper label={label} required={required} error={error} dark={dark}>
      <div className={cn('grid grid-cols-1 gap-2', cols)}>
        {options.map((opt) => {
          const active = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm text-left transition-colors',
                active
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-black'
                  : dark
                    ? 'border-white/15 bg-brand-black text-brand-white hover:border-white/30'
                    : 'border-black/15 bg-brand-white text-brand-black hover:border-black/30'
              )}
            >
              <span
                className={cn(
                  'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border',
                  active ? 'border-brand-gold bg-brand-gold' : dark ? 'border-white/30' : 'border-black/25'
                )}
              >
                {active && <Check size={11} strokeWidth={3} className="text-brand-black" />}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
    </FieldWrapper>
  )
}

interface RadioGroupProps {
  label: string
  options: { label: string; value: string }[]
  value: string
  onChange: (next: string) => void
  required?: boolean
  error?: string
  dark?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function RadioGroup({ label, options, value, onChange, required, error, dark, columns = 2 }: RadioGroupProps) {
  const cols =
    columns === 4 ? 'sm:grid-cols-4' : columns === 3 ? 'sm:grid-cols-3' : columns === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'
  return (
    <FieldWrapper label={label} required={required} error={error} dark={dark}>
      <div className={cn('grid grid-cols-1 gap-2', cols)}>
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm text-left transition-colors',
                active
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-black'
                  : dark
                    ? 'border-white/15 bg-brand-black text-brand-white hover:border-white/30'
                    : 'border-black/15 bg-brand-white text-brand-black hover:border-black/30'
              )}
            >
              <span
                className={cn(
                  'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border',
                  active ? 'border-brand-gold' : dark ? 'border-white/30' : 'border-black/25'
                )}
              >
                {active && <span className="h-2 w-2 rounded-full bg-brand-gold" />}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>
    </FieldWrapper>
  )
}
