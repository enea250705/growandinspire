'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/auth'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  createdTitle: string
  createdDesc: string
  backToLogin: string
  welcome: string
  createAccount: string
  logIn: string
  signUp: string
  fullName: string
  namePh: string
  email: string
  password: string
  forgot: string
  connecting: string
  createBtn: string
  agree: string
  terms: string
  and: string
  privacy: string
  noAccount: string
  haveAccount: string
  signUpFree: string
  logInLink: string
  showPw: string
  hidePw: string
}> = {
  en: {
    createdTitle: 'Account created',
    createdDesc: 'Check your email and confirm your address to activate your account.',
    backToLogin: 'Back to login',
    welcome: 'Welcome back',
    createAccount: 'Create your account',
    logIn: 'Log In',
    signUp: 'Sign Up',
    fullName: 'Full Name',
    namePh: 'Arta Kola',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    connecting: 'Signing in...',
    createBtn: 'Create Account',
    agree: 'By signing up you agree to our',
    terms: 'Terms',
    and: 'and',
    privacy: 'Privacy Policy',
    noAccount: "Don't have an account? ",
    haveAccount: 'Already a member? ',
    signUpFree: 'Sign up free',
    logInLink: 'Log in',
    showPw: 'Show password',
    hidePw: 'Hide password',
  },
  sq: {
    createdTitle: 'Llogaria u krijua',
    createdDesc: 'Kontrollo email-in dhe konfirmo adresën për të aktivizuar llogarinë.',
    backToLogin: 'Kthehu te hyrja',
    welcome: 'Mirë se u ktheve',
    createAccount: 'Krijo llogarinë tënde',
    logIn: 'Hyr',
    signUp: 'Regjistrohu',
    fullName: 'Emri i Plotë',
    namePh: 'Arta Kola',
    email: 'Email',
    password: 'Fjalëkalimi',
    forgot: 'Harrove fjalëkalimin?',
    connecting: 'Duke u lidhur...',
    createBtn: 'Krijo Llogari',
    agree: 'Duke u regjistruar pranon',
    terms: 'Kushtet',
    and: 'dhe',
    privacy: 'Politikën e Privatësisë',
    noAccount: 'Nuk ke llogari? ',
    haveAccount: 'Je tashmë anëtar? ',
    signUpFree: 'Regjistrohu falas',
    logInLink: 'Hyr',
    showPw: 'Shfaq fjalëkalimin',
    hidePw: 'Fshih fjalëkalimin',
  },
}

export default function LoginPage() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
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
      <div className="pt-20 lg:pt-24 min-h-screen bg-brand-black flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-brand-white rounded-2xl p-10">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-black mb-2">{c.createdTitle}</h2>
            <p className="text-black/50 text-sm mb-6">
              {c.createdDesc}
            </p>
            <button
              onClick={() => { setMode('login'); setSignupSuccess(false) }}
              className="text-brand-gold text-sm font-medium hover:underline"
            >
              {c.backToLogin}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-black flex items-center justify-center px-4">
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
            {mode === 'login' ? c.welcome : c.createAccount}
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
              {c.logIn}
            </button>
            <button
              onClick={() => { setMode('signup'); setError('') }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === 'signup' ? 'bg-brand-black text-brand-white' : 'text-black/50 hover:text-brand-black'
              }`}
            >
              {c.signUp}
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-black">{c.fullName}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder={c.namePh}
                  className="border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-black">{c.email}</label>
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
                <label className="text-sm font-medium text-brand-black">{c.password}</label>
                {mode === 'login' && (
                  <Link href="/forgot-password" className="text-xs text-brand-gold hover:underline">
                    {c.forgot}
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
                  aria-label={showPassword ? c.hidePw : c.showPw}
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
              {loading ? c.connecting : mode === 'login' ? c.logIn : c.createBtn}
            </button>
          </form>

          {mode === 'signup' && (
            <p className="text-center text-xs text-black/40 mt-4">
              {c.agree}{' '}
              <Link href="/terms" className="text-brand-gold hover:underline">{c.terms}</Link>
              {' '}{c.and}{' '}
              <Link href="/privacy" className="text-brand-gold hover:underline">{c.privacy}</Link>.
            </p>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          {mode === 'login' ? c.noAccount : c.haveAccount}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-brand-gold hover:underline"
          >
            {mode === 'login' ? c.signUpFree : c.logInLink}
          </button>
        </p>
      </div>
    </div>
  )
}
