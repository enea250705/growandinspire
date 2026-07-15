import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, { quote: string }> = {
  en: {
    quote: "For years I have believed that growth doesn't happen by chance. It comes when we choose to learn, to challenge ourselves and to surround ourselves with the right people. Grow & Inspire is where I want us to do all of this, together.",
  },
  sq: {
    quote: "Për vite kam besuar se rritja nuk ndodh rastësisht. Ajo vjen kur zgjedhim të mësojmë, të sfidojmë veten dhe të rrethohemi me njerëzit e duhur. Grow & Inspire është vendi ku dua t'i bëjmë të gjitha këto, së bashku.",
  },
}

export async function FounderQuote() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <section className="bg-brand-cream py-24 lg:py-32 border-t border-black/8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-px bg-brand-gold mx-auto mb-8" />
        <p className="font-serif text-2xl lg:text-3xl text-brand-black font-medium leading-relaxed mb-8">
          &ldquo;{c.quote}&rdquo;
        </p>
        <p className="text-brand-gold font-serif text-lg font-semibold">Alketa Vejsiu</p>
      </div>
    </section>
  )
}
