'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/auth'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)

  function set(f: string, v: string) { setForm((p) => ({ ...p, [f]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const result = await signUp({ name: form.name, email: form.email, password: form.password })
      setLoading(false)
      if (result.ok) {
        setSignupSuccess(true)
      } else {
        setError(result.error)
      }
    } else {
      const result = await signIn({ email: form.email, password: form.password })
      setLoading(false)
      if (result.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(result.error)
      }
    }
  }

  if (signupSuccess) {
    return (
      <div className="pt-16 lg:pt-24 min-h-screen bg-brand-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-brand-white rounded-2xl p-10">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">Account created</h2>
            <p className="text-black/50 text-sm mb-6">
              Check your email and confirm your address to activate your account.
            </p>
            <button
              onClick={() => { setMode('login'); setSignupSuccess(false) }}
              className="text-brand-gold text-sm font-medium hover:underline"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center">
            <Image
              src="/logo-final.png"
              alt="Grow & Inspire by Alketa Vejsiu"
              width={240}
              height={240}
              className="h-28 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-white/40 text-sm mt-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <div className="bg-brand-white rounded-2xl p-8">
          <div className="flex bg-black/5 rounded-full p-1 mb-8">
            <button
              onClick={() => { setMode('login'); setError('') }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === 'login' ? 'bg-brand-black text-brand-white' : 'text-black/50 hover:text-brand-black'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode('signup'); setError('') }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === 'signup' ? 'bg-brand-black text-brand-white' : 'text-black/50 hover:text-brand-black'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-black">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Arta Kola"
                  className="border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-black">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
                className="border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-brand-black">Password</label>
                {mode === 'login' && (
                  <Link href="/forgot-password" className="text-xs text-brand-gold hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-black/15 rounded-lg px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? 'Duke u lidhur...' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>

          {mode === 'signup' && (
            <p className="text-center text-xs text-black/40 mt-4">
              By signing up you agree to our{' '}
              <Link href="/terms" className="text-brand-gold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-brand-gold hover:underline">Privacy Policy</Link>.
            </p>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already a member? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-brand-gold hover:underline"
          >
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
