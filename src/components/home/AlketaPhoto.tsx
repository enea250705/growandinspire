// Full-width portrait band shown right after the hero.
export function AlketaPhoto() {
  return (
    <section className="bg-brand-black">
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/alketa-home.jpg"
          alt="Alketa Vejsiu"
          className="w-full h-full object-cover object-[50%_18%]"
        />
      </div>
    </section>
  )
}
