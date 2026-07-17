/**
 * Newsletter submission — honest by construction.
 *
 * There is no newsletter provider wired up. Rather than fake a subscription and
 * show "you're subscribed" (which the site did, and which contradicts the
 * privacy policy's "the forms transmit nothing"), the submit does something
 * real:
 *
 *  - If NEXT_PUBLIC_NEWSLETTER_ENDPOINT is set, POST the fields there and treat
 *    a 2xx as success.
 *  - Otherwise, open a pre-filled mailto to the association so the click
 *    actually initiates contact instead of lying.
 *
 * Either way the caller only shows the confirmation after this resolves. The
 * confirmation copy is written to be true in both cases ("we'll get back to
 * you"), not "you're subscribed".
 */
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? ''
const CONTACT = 'contact@ayitidijital.org'

export async function submitNewsletter(fields: Record<string, string>): Promise<void> {
  const email = (fields.email ?? '').trim()
  if (!email) throw new Error('email required')

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (!res.ok) throw new Error(`newsletter POST failed: ${res.status}`)
    return
  }

  // No provider configured — draft a real email instead of faking success.
  const lines = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  const subject = encodeURIComponent('Infolettre / Newsletter')
  const body = encodeURIComponent(lines)
  window.location.href = `mailto:${CONTACT}?subject=${subject}&body=${body}`
}
