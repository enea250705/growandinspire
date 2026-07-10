import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { I18nProvider } from '@/lib/i18n/provider'
import { getLocale, getDictionary } from '@/lib/i18n/server'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Grow and Inspire',
  description: 'A premium platform for personal growth, business leadership, meaningful connections, and curated experiences.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()])
  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-black antialiased">
        <I18nProvider locale={locale} dict={dict}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </I18nProvider>
      </body>
    </html>
  )
}
