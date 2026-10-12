// Lightweight client-side validators used by the application forms so people
// can't submit fake/garbage contact details.

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

/**
 * Real phone number that MUST include a country prefix (e.g. +355).
 * Digits only after the "+", 8-15 digits, no letters.
 */
export function isValidPhone(v: string): boolean {
  const s = v.trim()
  if (/[a-zA-Z]/.test(s)) return false
  if (!s.startsWith('+')) return false
  const digits = s.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 15
}

/**
 * Looks like a link: something with a domain in it (firma.al, www.firma.al,
 * https://firma.al/path?x=1, instagram.com/firma, a pasted list of links...).
 * Kept deliberately loose - applicants were getting blocked by edge cases
 * (query strings, trailing dots, non-ASCII domains, several links at once).
 */
export function isValidWebsite(v: string): boolean {
  return /[^\s.]+\.[^\s.]{2,}/u.test(v.trim())
}

/** A professional profile: a link, an @handle, or a plain profile name. */
export function isValidProfile(v: string): boolean {
  return v.trim().length >= 2
}
