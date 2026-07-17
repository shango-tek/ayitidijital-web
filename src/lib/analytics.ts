/**
 * Consent + analytics plumbing.
 *
 * There is currently NO analytics provider wired up: nothing is loaded, nothing
 * is stored, and the consent banner stays dormant. This file is the seam where
 * one gets added.
 *
 * READ THIS BEFORE WIRING A PROVIDER.
 *
 * The privacy policy (src/content/legal) makes factual claims about what this
 * site does — no cookies, no analytics, no third-party requests. Those claims
 * are load-bearing, and they were wrong once already: the old policy advertised
 * Plausible for months while no analytics existed. So the policy does not
 * hardcode "we have no analytics". It derives from `ANALYTICS_ENABLED` below,
 * and the privacy page swaps its summary point and its "Analytics" section
 * accordingly, in all three locales (see content/legal/index.ts). Turn a
 * provider on and the page starts disclosing it automatically.
 *
 * That coupling is the point: it makes the policy true by construction rather
 * than by someone remembering to edit prose. Keep it. If you add a provider:
 *
 *  1. Point `ANALYTICS_ENABLED` at its config.
 *  2. Update `analytics.on` in the three legal JSON files to name it honestly —
 *     who processes the data, where, on what legal basis.
 *  3. Set `CONSENT_REQUIRED` only if it actually writes to the visitor's device.
 *     A cookieless tracker needs no banner (§ 25 TDDDG is not triggered), and a
 *     banner shown when nothing is stored is noise, not compliance.
 */

/**
 * Is an analytics provider configured? Drives BOTH whether a tracker loads and
 * what the privacy policy claims. Currently always false — nothing is wired.
 */
export const ANALYTICS_ENABLED = false

/**
 * Does the provider store something on the visitor's device, so that opt-in
 * consent is legally required before it may run at all?
 *
 * Only ever true alongside ANALYTICS_ENABLED. When true, the tracker MUST stay
 * inert until `readConsent() === 'granted'` — loading it first and asking after
 * is not consent.
 */
export const CONSENT_REQUIRED = false

/** localStorage key holding the visitor's choice. Only written once asked. */
export const CONSENT_KEY = 'ad-consent'

export type ConsentChoice = 'granted' | 'denied'

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    // Private mode / storage blocked — treat as undecided rather than throwing.
    return null
  }
}

/**
 * Record the choice and announce it. A provider added later should listen for
 * `ad-consent-change` (and check `readConsent()` on mount) rather than being
 * called from the banner directly — that keeps the banner provider-agnostic.
 */
export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* storage unavailable — the choice just won't persist */
  }
  window.dispatchEvent(new CustomEvent('ad-consent-change', { detail: choice }))
}
