// Best-effort transactional email via Resend (https://resend.com). Kept
// dependency-free (plain REST call) so it works anywhere without a build step.
//
// Configure these in the host environment (e.g. Vercel → Settings → Env Vars):
//   RESEND_API_KEY - API key from resend.com
//   EMAIL_FROM     - verified sender, e.g. "Grow & Inspire <noreply@growandinspire.al>"
//   NOTIFY_EMAIL   - destination inbox, e.g. your Gmail. Comma-separate for several.
//
// When any of these are missing the helper simply no-ops, so form submissions
// never fail just because email isn't configured yet.

interface EmailArgs {
  subject: string
  html: string
  /** Reply-To, so hitting "reply" answers the applicant directly. */
  replyTo?: string
}

export async function sendNotificationEmail({ subject, html, replyTo }: EmailArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  // Destination inbox. Defaults to the contact address; NOTIFY_EMAIL can
  // override it (and may be a comma-separated list).
  const to = process.env.NOTIFY_EMAIL || 'marketing@classbyav.com'

  if (!apiKey || !from) return false

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) {
      console.error('sendNotificationEmail: Resend returned', res.status, await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('sendNotificationEmail error', e)
    return false
  }
}

/** Render a simple labelled table for the given fields, skipping empties. */
export function emailFieldsTable(rows: [string, string | null | undefined][]): string {
  const cells = rows
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111">${String(v).replace(/</g, '&lt;')}</td></tr>`,
    )
    .join('')
  return `<table style="border-collapse:collapse;font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif">${cells}</table>`
}
