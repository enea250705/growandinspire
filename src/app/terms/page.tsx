export default function TermsPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Legal</p>
          <h1 className="font-serif text-5xl font-bold text-brand-white">Terms of Service</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-black/70 space-y-6">
            <p className="text-black/50 text-sm">Last updated: June 2026</p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Grow and Inspire, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">2. Membership</h2>
            <p>
              Memberships are billed monthly or annually as selected. You may cancel at any time; access continues until the end of the current billing period. Refunds are not provided for partial periods.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">3. Content Access</h2>
            <p>
              Premium content is available only to active members with the appropriate membership tier. Content is for personal use only. Sharing login credentials or content with non-members is prohibited.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">4. Applications</h2>
            <p>
              Submission of an application (Dinner with Alketa, job, guest, or investment) does not guarantee acceptance. All applications are reviewed manually and at our sole discretion.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">5. Intellectual Property</h2>
            <p>
              All content on this platform - videos, articles, guides, and materials - is the intellectual property of Grow and Inspire / Class Media. Reproduction or redistribution without written permission is prohibited.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">6. Limitation of Liability</h2>
            <p>
              Grow and Inspire is provided &quot;as is.&quot; We make no warranties regarding uninterrupted availability or fitness for a particular purpose. Our liability is limited to the amount paid for the current billing period.
            </p>

            <h2 className="font-serif text-2xl font-bold text-brand-black">7. Contact</h2>
            <p>
              Questions about these terms? Contact us at{' '}
              <a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
