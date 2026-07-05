import { ApplyForm } from '@/components/forms/ApplyForm'

export default function ApplyPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Apply Now</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            Get Involved
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Three ways to be part of the Grow and Inspire ecosystem - as a team member, a guest voice, or an idea worth backing.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplyForm />
        </div>
      </section>
    </div>
  )
}
