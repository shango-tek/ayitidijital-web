import type { ReactNode } from 'react'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

export interface AboutBentoPillar {
  name: string
  body: string
}

export interface AboutBentoProps {
  id?: string
  /** Small pill badge (eyebrow). */
  badge: string
  /** Headline — a trailing period renders in brand gold. */
  title: string
  /** One word of the headline rendered as an outlined (stroke) accent, e.g. "enpak". */
  strokeWord?: string
  lead: string
  cta: string
  ctaHref: string
  /** Exactly three: Mission / Vision / Devise. */
  pillars: AboutBentoPillar[]
  /** Photo filling the fourth bento cell. */
  photo: string
  photoAlt: string
}

/* Simple stroke icons for the three pillars. */
const ICONS: ReactNode[] = [
  // Mission — target
  <svg key="m" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" />
  </svg>,
  // Vision — eye
  <svg key="v" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
  // Devise — flag
  <svg key="d" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M5 21V4M5 4h11.5l-2 4 2 4H5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
]

/** Bento feature card — icon top, label + body bottom, lifts and tilts on hover. */
function BentoCard({ icon, label, body }: { icon: ReactNode; label: string; body: string }) {
  return (
    <div className="group flex min-h-[13rem] flex-col rounded-card bg-[#F2F3F8] p-6 ring-1 ring-black/[0.03] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:rotate-[0.6deg] hover:shadow-[0_28px_60px_-38px_rgba(10,20,60,0.55)] md:p-7">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
        {icon}
      </span>
      <h3 className="mt-auto pt-8 font-display text-lg font-bold tracking-tight text-primary md:text-xl">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

/**
 * "Beyond digital" — bento layout: intro (badge → headline → lead → CTA) on the
 * left, and a 2×2 bento of the three pillars (Mission / Vision / Devise) plus a
 * photo on the right.
 */
export function AboutBento({
  id,
  badge,
  title,
  strokeWord,
  lead,
  cta,
  ctaHref,
  pillars,
  photo,
  photoAlt,
}: AboutBentoProps) {
  const trimmed = title.trimEnd()
  const hasDot = trimmed.endsWith('.')
  const head = hasDot ? trimmed.slice(0, -1) : trimmed

  // Render one word of the headline as an outlined (stroke) accent, if present.
  const strokeIdx = strokeWord ? head.indexOf(strokeWord) : -1
  const headContent =
    strokeWord && strokeIdx !== -1 ? (
      <>
        {head.slice(0, strokeIdx)}
        <span className="text-transparent [-webkit-text-stroke:2px_var(--color-primary)]">
          {strokeWord}
        </span>
        {head.slice(strokeIdx + strokeWord.length)}
      </>
    ) : (
      head
    )

  return (
    <section id={id} className="bg-white py-16 md:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT — intro */}
          <div>
            <Kicker label={badge} red />
            <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-primary">
              {headContent}
              {hasDot && <span className="text-gold-deep">.</span>}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft lg:text-lg">
              {lead}
            </p>
            <div className="mt-8">
              <Button variant="gold" href={ctaHref}>
                {cta}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </div>

          {/* RIGHT — bento: 3 pillar cards + 1 photo */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {pillars.slice(0, 3).map((p, i) => (
              <BentoCard key={p.name} icon={ICONS[i]} label={p.name} body={p.body} />
            ))}
            <div className="min-h-[13rem] overflow-hidden rounded-card ring-1 ring-black/[0.04]">
              <img
                src={photo}
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
