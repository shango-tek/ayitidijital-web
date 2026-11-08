import { Reveal } from '../ui/Reveal'

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
 * "Passe à l'action" — the finale, in full electric ultramarine so the page
 * builds to its loudest call before the dark footer. Two audience cards: fund a
 * project (solid white card, dark→electric button) and contribute code (a ghost
 * card with a white outline button). Props are unchanged from the Sui version.
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
  const trimmed = title.trimEnd()
  const hasDot = trimmed.endsWith('.')
  const head = hasDot ? trimmed.slice(0, -1) : trimmed

  return (
    <section id={id} className="bg-electric py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-white">
            <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
            {label}
          </span>
          <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-white">
            {head}
            {hasDot && <span className="text-drapo-red">.</span>}
          </h2>
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-white/80">{subtitle}</p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:gap-7">
          {/* Fund a project — solid white card */}
          <article className="flex flex-col border-4 border-double border-tum-ink bg-tum-paper p-8 lg:p-10">
            <span className="font-tum text-[11px] font-bold uppercase tracking-[0.22em] text-electric">{fundKreyol}</span>
            <h3 className="mt-4 font-tum text-2xl font-extrabold text-tum-ink lg:text-3xl">{fundTitle}</h3>
            <p className="mb-8 mt-3 font-tum leading-relaxed text-tum-muted">{fundDesc}</p>
            <div className="mt-auto">
              <a
                href={fundHref}
                className="group inline-flex items-center gap-2.5 bg-tum-ink px-6 py-3.5 font-tum text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-electric"
              >
                {fundButton}
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>

          {/* Contribute code — ghost card on electric */}
          <article className="flex flex-col border-4 border-double border-white/40 p-8 lg:p-10">
            <span className="font-tum text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">{codeKreyol}</span>
            <h3 className="mt-4 font-tum text-2xl font-extrabold text-white lg:text-3xl">{codeTitle}</h3>
            <p className="mb-8 mt-3 font-tum leading-relaxed text-white/80">{codeDesc}</p>
            <div className="mt-auto">
              <a
                href={codeHref}
                className="group inline-flex items-center gap-2.5 border-2 border-white px-6 py-3.5 font-tum text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-electric"
              >
                {codeButton}
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
