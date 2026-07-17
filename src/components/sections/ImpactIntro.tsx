import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

export interface ImpactIntroProps {
  id?: string
  /** Eyebrow above the headline (pixel-dot Kicker). */
  label: string
  /** Headline — a trailing period is rendered in brand gold. */
  title: string
  lead: string
  cta: string
  ctaHref: string
}

/**
 * "Beyond digital" mission intro under the hero: eyebrow → headline (gold period)
 * → lead → a single gold CTA, running full width on the white page.
 */
export function ImpactIntro({ id, label, title, lead, cta, ctaHref }: ImpactIntroProps) {
  // Split off a trailing "." so it can carry the gold accent.
  const trimmed = title.trimEnd()
  const hasDot = trimmed.endsWith('.')
  const head = hasDot ? trimmed.slice(0, -1) : trimmed

  return (
    <section id={id} className="bg-white py-16 md:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="mb-4">
          <Kicker label={label} red />
        </div>
        <h2 className="text-balance font-display text-[clamp(2.1rem,4.8vw,3.7rem)] font-extrabold leading-[1.06] tracking-tight text-primary">
          {head}
          {hasDot && <span className="text-gold">.</span>}
        </h2>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-ink-soft lg:text-lg">
          {lead}
        </p>
        <div className="mt-8">
          <Button variant="gold" href={ctaHref}>
            {cta}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="18"
              height="18"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}
