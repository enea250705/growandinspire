import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { I18nProvider } from '@/components/i18n/I18nProvider'
import { getLang } from '@/lib/i18n-server'

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
  // The site ships its own Albanian/English switcher, so tell browsers not to
  // auto-translate (which also adds those dotted underlines on translated text).
  other: { google: 'notranslate' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = await getLang()
  return (
    <html lang={lang} translate="no" className={`${inter.variable} ${playfair.variable} h-full notranslate`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-black antialiased">
        <I18nProvider initialLang={lang}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
