// Lightweight bilingual (English / Albanian) dictionary. Phase 1 covers the
// site chrome (navbar); more surfaces get keys added over time. Any missing key
// falls back to English, then to the key itself, so partial coverage never
// breaks the UI.

export type Lang = 'en' | 'sq'
export const LANGS: Lang[] = ['en', 'sq']
export const DEFAULT_LANG: Lang = 'en'
export const LANG_COOKIE = 'lang'

type Dict = Record<string, string>

const messages: Record<Lang, Dict> = {
  en: {
    'nav.learning': 'Learning',
    'nav.coaching': 'Coaching',
    'nav.events': 'Events',
    'nav.community': 'Community',
    'nav.insights': 'Insights',
    'nav.about': 'About',
    'nav.login': 'Log In',
    'nav.join': 'Join the Circle',
    'nav.dashboard': 'Dashboard',

    'hero.badge': 'A Premium Platform',
    'hero.desc': 'A premium platform for personal growth, business leadership, meaningful connections, and curated experiences.',
    'hero.watch': 'Watch Free',
    'hero.member': 'Become a Member',
    'hero.quote': '“Lead by growing. Inspire by leading.”',

    'footer.newsTitle': 'Insights that inspire action.',
    'footer.newsSub': 'Get weekly insights delivered to your inbox.',
    'footer.subscribed': "You're subscribed. Welcome to the circle.",
    'footer.emailPlaceholder': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.subError': 'There was a problem. Please try again.',
    'footer.tagline': 'A premium platform for personal growth, business leadership, and meaningful connections.',
    'footer.cat.Platform': 'Platform',
    'footer.cat.Apply': 'Apply',
    'footer.cat.Company': 'Company',
    'footer.link.watch': 'Watch',
    'footer.link.coaching': 'Coaching',
    'footer.link.events': 'Events',
    'footer.link.membership': 'Membership',
    'footer.link.applyNow': 'Apliko Tani',
    'footer.link.dinner': 'Dinner with Alketa',
    'footer.link.class': 'Work with Class',
    'footer.link.guest': 'Become a Guest',
    'footer.link.about': 'About',
    'footer.link.sponsorship': 'Sponsorship',
    'footer.link.insights': 'Insights',
    'footer.rights': 'Grow and Inspire / Class Media. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    'dash.nav.dashboard': 'Dashboard',
    'dash.nav.learning': 'Learning Hub',
    'dash.nav.membership': 'My Membership',
    'dash.nav.saved': 'Saved Content',
    'dash.nav.downloads': 'My Downloads',
    'dash.nav.applications': 'My Applications',
    'dash.nav.events': 'Upcoming Events',
    'dash.nav.settings': 'Settings',
    'dash.member': 'Member',
    'dash.adminPanel': 'Admin Panel',
    'dash.signOut': 'Sign Out',
  },
  sq: {
    'nav.learning': 'Mësim',
    'nav.coaching': 'Coaching',
    'nav.events': 'Evente',
    'nav.community': 'Komuniteti',
    'nav.insights': 'Këshilla',
    'nav.about': 'Rreth Nesh',
    'nav.login': 'Hyr',
    'nav.join': 'Bashkohu',
    'nav.dashboard': 'Paneli',

    'hero.badge': 'Një Platformë Premium',
    'hero.desc': 'Një platformë premium për zhvillim personal, lidership në biznes, lidhje kuptimplota dhe eksperienca të kuruara.',
    'hero.watch': 'Shiko Falas',
    'hero.member': 'Bëhu Anëtar',
    'hero.quote': '“Udhëhiq duke u rritur. Inspiro duke udhëhequr.”',

    'footer.newsTitle': 'Këshilla që frymëzojnë veprim.',
    'footer.newsSub': 'Merr këshilla javore direkt në email.',
    'footer.subscribed': 'U regjistrove. Mirë se erdhe në rreth.',
    'footer.emailPlaceholder': 'Adresa jote e email-it',
    'footer.subscribe': 'Regjistrohu',
    'footer.subError': 'Problem me regjistrimin. Provo sërish.',
    'footer.tagline': 'Një platformë premium për zhvillim personal, lidership në biznes dhe lidhje kuptimplota.',
    'footer.cat.Platform': 'Platforma',
    'footer.cat.Apply': 'Apliko',
    'footer.cat.Company': 'Kompania',
    'footer.link.watch': 'Shiko',
    'footer.link.coaching': 'Coaching',
    'footer.link.events': 'Evente',
    'footer.link.membership': 'Anëtarësimi',
    'footer.link.applyNow': 'Apliko Tani',
    'footer.link.dinner': 'Darkë me Alketën',
    'footer.link.class': 'Puno me Class',
    'footer.link.guest': 'Bëhu i Ftuar',
    'footer.link.about': 'Rreth Nesh',
    'footer.link.sponsorship': 'Sponsorizim',
    'footer.link.insights': 'Këshilla',
    'footer.rights': 'Grow and Inspire / Class Media. Të gjitha të drejtat e rezervuara.',
    'footer.privacy': 'Privatësia',
    'footer.terms': 'Kushtet',

    'dash.nav.dashboard': 'Paneli',
    'dash.nav.learning': 'Learning Hub',
    'dash.nav.membership': 'Anëtarësimi Im',
    'dash.nav.saved': 'Përmbajtja e Ruajtur',
    'dash.nav.downloads': 'Shkarkimet e Mia',
    'dash.nav.applications': 'Aplikimet e Mia',
    'dash.nav.events': 'Eventet e Ardhshme',
    'dash.nav.settings': 'Cilësimet',
    'dash.member': 'Anëtar',
    'dash.adminPanel': 'Paneli i Adminit',
    'dash.signOut': 'Dil',
  },
}

export function normalizeLang(value?: string | null): Lang {
  return value === 'sq' ? 'sq' : 'en'
}

export function translate(lang: Lang, key: string): string {
  return messages[lang]?.[key] ?? messages[DEFAULT_LANG][key] ?? key
}
