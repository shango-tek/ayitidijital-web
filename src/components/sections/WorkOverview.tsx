import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

export interface WorkCard {
  label: string
  title: string
  body: string
  cta: string
  href: string
}

export interface WorkOverviewProps {
  id?: string
  label: string
  strokeWord: string
  titleRest: string
  subtitle: string
  cards: WorkCard[]
  outro: string
  viewAll: string
  viewAllHref: string
}

/* Per-block ground for the three Bati / Enkibe / Konekte manifesto blocks.
   Black → electric → white: a dark-to-light descent that opens hard against the
   white About section above and resolves back to white, with the drapo red
   landing on the final block's index numeral. */
const BLOCKS = [
  { bg: 'bg-tum-ink', text: 'text-white', sub: 'text-white/70', idx: 'text-lavender', rule: 'border-white/15' },
  { bg: 'bg-electric', text: 'text-white', sub: 'text-white/80', idx: 'text-white/60', rule: 'border-white/25' },
  { bg: 'bg-tum-paper', text: 'text-tum-ink', sub: 'text-tum-muted', idx: 'text-drapo-red', rule: 'border-tum-ink/15' },
] as const

/**
 * "What we do" — the manifesto, and the page's loudest moment in the
 * UnternehmerTUM register. A white header, then the three Bati / Enkibe /
 * Konekte pillars as full-bleed alternating blocks (black → electric → white),
 * each with an oversized index numeral and a giant Kreyòl label. Props are
 * unchanged from the Sui version, so HomeView and all three locales keep
 * working untouched.
 */
export function WorkOverview({
  id,
  label,
  strokeWord,
  titleRest,
  subtitle,
  cards,
}: WorkOverviewProps) {
  return (
    <section id={id} className="bg-tum-paper">
      {/* header */}
      <div className="mx-auto max-w-[90rem] px-5 pt-20 md:px-10 md:pt-24 lg:pt-32">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
            <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
            {label}
          </span>
          <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
            <span className="font-serif italic font-semibold text-electric">{strokeWord}</span> {titleRest}
          </h2>
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{subtitle}</p>
        </Reveal>
      </div>

      {/* full-bleed manifesto blocks */}
      <RevealGroup className="mt-14 md:mt-20">
        {cards.map((card, i) => {
          const b = BLOCKS[i % BLOCKS.length]
          return (
            <RevealItem key={card.label}>
              <a href={card.href} className={`group block w-full ${b.bg} ${b.text}`}>
                <div className="mx-auto grid max-w-[90rem] gap-x-16 gap-y-8 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-end">
                  {/* index + giant label */}
                  <div>
                    <span className={`block font-tum text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-none tabular-nums ${b.idx}`}>
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-tum text-[clamp(3rem,10vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]">
                      {card.label}
                    </h3>
                  </div>

                  {/* title + body + cta */}
                  <div className="pt-7">
                    <p className="font-tum text-xl font-bold tracking-tight md:text-2xl">{card.title}</p>
                    <p className={`mt-4 max-w-xl font-tum text-base leading-relaxed ${b.sub}`}>{card.body}</p>
                    <span className="mt-7 inline-flex items-center gap-2 font-tum text-sm font-bold uppercase tracking-wide">
                      {card.cta}
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
