import { cn } from '@/lib/utils'
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
