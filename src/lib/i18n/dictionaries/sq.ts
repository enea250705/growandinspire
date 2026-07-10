// Albanian — source language. Its shape defines the Dictionary type; every other
// locale must provide the same keys.
export const sq = {
  nav: {
    learning: 'Mëso',
    coaching: 'Coaching',
    events: 'Evente',
    community: 'Komuniteti',
    careers: 'Karriera',
    about: 'Rreth Nesh',
    logIn: 'Hyr',
    joinCircle: 'Bashkohu me Rrethin',
    dashboard: 'Paneli',
  },
  mobileNav: {
    learningHub: 'Qendra e Mësimit',
    events: 'Evente',
    dashboard: 'Paneli',
  },
  hero: {
    eyebrow: 'Një Platformë Premium',
    subtitle:
      'Një platformë premium për rritje personale, lidership në biznes, lidhje kuptimplota dhe përvoja të përzgjedhura.',
    watchFree: 'Shiko Falas',
    becomeMember: 'Bëhu Anëtar',
    quote: 'Ndërto diçka që i mbijeton momentit.',
    quoteAuthor: '- Alketa Vejsiu',
  },
  footer: {
    newsletterTitle: 'Njohuri që frymëzojnë veprim.',
    newsletterSub: 'Merr njohuri javore direkt në email.',
    subscribed: 'U regjistrove. Mirë se erdhe në rreth.',
    emailPlaceholder: 'Adresa jote e email-it',
    subscribe: 'Abonohu',
    subError: 'Problem me regjistrimin. Provo sërish.',
    tagline:
      'Një platformë premium për rritje personale, lidership në biznes dhe lidhje kuptimplota.',
    groups: { platform: 'Platforma', apply: 'Apliko', company: 'Kompania' },
    links: {
      watch: 'Shiko',
      coaching: 'Coaching',
      events: 'Evente',
      membership: 'Anëtarësia',
      applyNow: 'Apliko Tani',
      dinner: 'Dinner with Alketa',
      workWithClass: 'Work with Class',
      becomeGuest: 'Bëhu i Ftuar',
      about: 'Rreth Nesh',
      sponsorship: 'Sponsorizim',
      insights: 'Njohuri',
    },
    privacy: 'Privatësia',
    terms: 'Kushtet',
    rights: '© {year} Grow and Inspire / Class Media. Të gjitha të drejtat e rezervuara.',
  },
  switcher: { label: 'Gjuha' },
}

export type Dictionary = typeof sq
