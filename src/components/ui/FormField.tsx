import { cn } from '@/lib/utils'
import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export function FieldWrapper({ label, required, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-brand-black">
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
}

export function Input({ label, required, error, className, ...props }: InputProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        className={cn(
          'border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white placeholder:text-black/30 focus:outline-none focus:border-brand-gold transition-colors',
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
}

export function Textarea({ label, required, error, className, ...props }: TextareaProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <textarea
        rows={4}
        className={cn(
          'border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white placeholder:text-black/30 focus:outline-none focus:border-brand-gold transition-colors resize-none',
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
  options: { label: string; value: string }[]
}

export function Select({ label, required, error, options, className, ...props }: SelectProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <select
        className={cn(
          'border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors',
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
