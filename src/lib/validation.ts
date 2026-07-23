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

/** A real website/URL, with or without the http(s):// prefix. */
export function isValidWebsite(v: string): boolean {
  return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.trim())
}

/** A professional profile: a website URL or an @handle. */
export function isValidProfile(v: string): boolean {
  const s = v.trim()
  if (s.startsWith('@')) return s.length > 1
  return isValidWebsite(s)
}
