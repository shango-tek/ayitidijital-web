import { SectionHeader } from '../ui/SectionHeader'

export interface PasseALactionProps {
  id?: string
  label: string
  title: string
  subtitle: string
  fundKreyol: string
  fundTitle: string
  fundDesc: string
  fundButton: string
  fundHref: string
  codeKreyol: string
  codeTitle: string
  codeDesc: string
  codeButton: string
  codeHref: string
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/**
 * "Passe à l'action" — split header over two audience cards: fund a project
 * (solid gold CTA) and contribute code (gold outline CTA). Port of the Angular
 * `cta-section`, re-skinned onto the light theme with the brand-gold buttons.
 */
export function PasseALaction({
  id,
  label,
  title,
  subtitle,
  fundKreyol,
  fundTitle,
  fundDesc,
  fundButton,
  fundHref,
  codeKreyol,
  codeTitle,
  codeDesc,
  codeButton,
  codeHref,
}: PasseALactionProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-[100px]">
      {/* ambient glows */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.07] blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeader variant="split" size="md" label={label} title={title} subtitle={subtitle} />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:gap-7">
          {/* Fund a project — solid gold CTA */}
          <article className="flex flex-col rounded-card border border-black/[0.08] bg-[#F8FAFD] p-8 transition-colors duration-300 hover:border-gold/40 lg:p-10">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-deep">{fundKreyol}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-primary lg:text-3xl">{fundTitle}</h3>
            <p className="mb-8 mt-3 leading-relaxed text-ink-soft">{fundDesc}</p>
            <a
              href={fundHref}
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-display text-sm font-bold text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              {fundButton}
              <Arrow />
            </a>
          </article>

          {/* Contribute code — gold outline CTA */}
          <article className="flex flex-col rounded-card border border-black/[0.08] bg-[#F8FAFD] p-8 transition-colors duration-300 hover:border-gold/40 lg:p-10">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-deep">{codeKreyol}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-primary lg:text-3xl">{codeTitle}</h3>
            <p className="mb-8 mt-3 leading-relaxed text-ink-soft">{codeDesc}</p>
            <a
              href={codeHref}
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full border-2 border-gold-deep px-6 py-3 font-display text-sm font-bold text-gold-deep transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-primary"
            >
              {codeButton}
              <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
