export default function PrivacyPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Legal</p>
          <h1 className="font-serif text-5xl font-bold text-brand-white">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-black/70 space-y-6">
            <p className="text-black/50 text-sm">Last updated: June 2026</p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">1. Information We Collect</h2>
            <p>
              We collect information you provide when you create an account, purchase a membership, submit applications (Dinner with Alketa, job/guest/investment), or contact us via our sponsorship form. This includes name, email address, phone number, and professional information.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">2. How We Use Your Information</h2>
            <p>
              We use your information to manage your membership, communicate about events and content, process payments through Stripe, and review your applications. We do not sell your personal data to third parties.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">3. Data Storage</h2>
            <p>
              Your data is stored securely using Supabase infrastructure hosted in the EU. Payment information is handled exclusively by Stripe and is never stored on our servers.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at <a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">5. Cookies</h2>
            <p>
              We use session cookies for authentication and basic analytics. No third-party tracking cookies are used.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">6. Contact</h2>
            <p>
              Grow and Inspire / Class Media<br />
              Tirana, Albania<br />
              <a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
