'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  function set(f: string, v: string) { setForm((p) => ({ ...p, [f]: v })) }

  return (
    <div className="pt-16 min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold text-brand-white">
            GROW & INSPIRE
          </Link>
          <p className="text-white/40 text-sm mt-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <div className="bg-brand-white rounded-2xl p-8">
          {/* Toggle */}
          <div className="flex bg-black/5 rounded-full p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === 'login' ? 'bg-brand-black text-brand-white' : 'text-black/50 hover:text-brand-black'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === 'signup' ? 'bg-brand-black text-brand-white' : 'text-black/50 hover:text-brand-black'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-black">Full Name</label>
                <input
                  type="text"
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
                  <button type="button" className="text-xs text-brand-gold hover:underline">Forgot password?</button>
                )}
              </div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                placeholder="••••••••"
                className="border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors mt-2"
            >
              {mode === 'login' ? 'Log In' : 'Create Account'}
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
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-brand-gold hover:underline"
          >
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
