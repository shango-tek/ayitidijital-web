/**
 * Contact form submission — the same construction as the newsletter, and honest
 * for the same reason.
 *
 *  - If NEXT_PUBLIC_CONTACT_ENDPOINT is set, POST the fields there and treat a
 *    2xx as success.
 *  - Otherwise, open a pre-filled message in the visitor's own mail client.
 *
 * The fallback is not a degraded mode — it is privacy-favourable. Nothing
 * reaches our servers at all: the text goes into the visitor's mail program and
 * they send it themselves, so there is no collection to disclose beyond the
 * ordinary email correspondence that follows. The privacy policy's "Formulaires"
 * section says exactly this; if you wire an endpoint, that section has to be
 * updated in the same change, because then the site IS collecting.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? ''
const CONTACT = 'contact@ayitidijital.org'

export interface ContactFields {
  firstName?: string
  lastName?: string
  email: string
  /** Optional — a number to call back on, supplied by the visitor. */
  phone?: string
  message: string
}

/**
 * Which path the submit took. The caller needs this because the two outcomes
 * are genuinely different things to tell someone: `sent` means we have the
 * message, `handoff` means their mail client is open with it and they still
 * have to press send. Saying "thanks, we'll reply" after a handoff would be a
 * lie the visitor discovers only when nobody answers.
 */
export type ContactOutcome = 'sent' | 'handoff'

export async function submitContact(fields: ContactFields): Promise<ContactOutcome> {
  const email = fields.email.trim()
  const message = fields.message.trim()
  if (!email || !message) throw new Error('email and message required')

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (!res.ok) throw new Error(`contact POST failed: ${res.status}`)
    return 'sent'
  }

  const name = [fields.firstName, fields.lastName].filter(Boolean).join(' ').trim()
  const subject = encodeURIComponent(name ? `Kontak — ${name}` : 'Kontak')
  const body = encodeURIComponent(
    [name, email, fields.phone, '', message].filter(Boolean).join('\n'),
  )
  window.location.href = `mailto:${CONTACT}?subject=${subject}&body=${body}`
  return 'handoff'
}
