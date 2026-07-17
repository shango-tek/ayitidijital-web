import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'

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
            <div className="mt-auto">
              <Button variant="gold" href={fundHref} size="sm" arrow>
                {fundButton}
              </Button>
            </div>
          </article>

          {/* Contribute code — gold outline CTA */}
          <article className="flex flex-col rounded-card border border-black/[0.08] bg-[#F8FAFD] p-8 transition-colors duration-300 hover:border-gold/40 lg:p-10">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold-deep">{codeKreyol}</span>
            <h3 className="mt-4 font-display text-2xl font-bold text-primary lg:text-3xl">{codeTitle}</h3>
            <p className="mb-8 mt-3 leading-relaxed text-ink-soft">{codeDesc}</p>
            <div className="mt-auto">
              <Button variant="gold-outline" href={codeHref} size="sm" arrow>
                {codeButton}
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
