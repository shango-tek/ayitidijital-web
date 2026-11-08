import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

export interface AboutBentoPillar {
  name: string
  body: string
}

export interface AboutBentoProps {
  id?: string
  /** Small eyebrow label. */
  badge: string
  /** Headline — a trailing period renders in drapo red. */
  title: string
  /** One word of the headline rendered in electric ultramarine. */
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

/* Stroke icons for the three pillars. The flag (Devise) doubles as a quiet
   drapo nod. */
const ICONS: ReactNode[] = [
  // Mission — target
  <svg key="m" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" />
  </svg>,
  // Vision — eye
  <svg key="v" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  // Devise — flag
  <svg key="d" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M5 21V4M5 4h11.5l-2 4 2 4H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
]

/** TUM feature card — sharp-cornered lavender panel with a black border; icon
    tile on top, label + body at the bottom. Lifts on hover and the tile goes
    electric. */
function PillarCard({ icon, label, body }: { icon: ReactNode; label: string; body: string }) {
  return (
    <div className="group flex min-h-[13rem] flex-col border-4 border-double border-tum-ink bg-lavender p-6 transition-transform duration-200 hover:-translate-y-1 md:p-7">
      <span className="grid h-12 w-12 shrink-0 place-items-center bg-tum-ink text-white transition-colors duration-200 group-hover:bg-electric">
        {icon}
      </span>
      <h3 className="mt-auto pt-8 font-tum text-xl font-extrabold tracking-tight text-tum-ink md:text-2xl">
        {label}
      </h3>
      <p className="mt-2 font-tum text-sm leading-relaxed text-tum-ink/70">{body}</p>
    </div>
  )
}

/**
 * "Beyond digital" — UnternehmerTUM register: white ground, giant Albert Sans
 * headline with an electric emphasis word and a drapo-red period, and a
 * staggered bento of the three pillars (Mission / Vision / Devise) plus a photo.
 * Props are unchanged from the Sui version, so HomeView and all three locales
 * keep working untouched.
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

  // Render one word of the headline in electric, if present.
  const strokeIdx = strokeWord ? head.indexOf(strokeWord) : -1
  const headContent =
    strokeWord && strokeIdx !== -1 ? (
      <>
        {head.slice(0, strokeIdx)}
        <span className="font-serif italic font-semibold text-electric">{strokeWord}</span>
        {head.slice(strokeIdx + strokeWord.length)}
      </>
    ) : (
      head
    )

  return (
    <section id={id} className="bg-tum-paper py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <Reveal className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT — intro */}
          <div>
            <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
              <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
              {badge}
            </span>
            <h2 className="mt-6 font-tum text-[clamp(2.4rem,5.2vw,4.2rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
              {headContent}
              {hasDot && <span className="text-drapo-red">.</span>}
            </h2>
            <p className="mt-6 max-w-xl font-tum text-lg leading-relaxed text-tum-muted">{lead}</p>
            <div className="mt-9">
              <a
                href={ctaHref}
                className="group inline-flex items-center gap-2.5 bg-electric px-7 py-4 font-tum text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
              >
                {cta}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — staggered pillars + photo. Mission stays leftmost, so
              Mission → Vision → Devise survives for a reader arriving from the
              copy; the first column is dropped so Mission lands on the eyebrow's
              line rather than floating above the headline. */}
          <div className="grid grid-cols-2 items-start gap-4 sm:gap-5">
            <div className="flex flex-col gap-4 sm:mt-12 sm:gap-5 lg:mt-16">
              {pillars.slice(0, 2).map((p, i) => (
                <PillarCard key={p.name} icon={ICONS[i]} label={p.name} body={p.body} />
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              {pillars.slice(2, 3).map((p) => (
                <PillarCard key={p.name} icon={ICONS[2]} label={p.name} body={p.body} />
              ))}
              <div className="min-h-[13rem] flex-1 overflow-hidden border-4 border-double border-tum-ink">
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
        </Reveal>
      </div>
    </section>
  )
}
