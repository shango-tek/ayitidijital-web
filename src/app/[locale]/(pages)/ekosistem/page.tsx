import { RoutePage } from '@/components/pages/RoutePage'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { cn } from '@/lib/utils'
import { routeMetadata } from '../_metadata'

/** Stable per-project slug, derived from the image filename (already unique). */
function slugOf(image: string): string {
  return image.split('/').pop()?.replace(/\.\w+$/, '') ?? ''
}

const statusClass = (k: 'active' | 'dev' | 'soon') =>
  k === 'active'
    ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
    : k === 'dev'
      ? 'border-sky-400/40 bg-sky-400/15 text-sky-200'
      : 'border-white/25 bg-white/10 text-white/70'

/**
 * "Écosystème" — the full incubated-projects list. Previously an empty
 * RoutePage, which is why all six home carousel cards had nowhere distinct to
 * go. Each project is now a real anchored card (id = its slug), so a home card
 * links to /ekosistem#<slug> and lands on that project.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/ekosistem', locale)
}

export default async function EkosistemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = toLocale(locale)
  const c = getSiteContent(lang)
  const eco = c.ecosystem

  return (
    <RoutePage
      content={c}
      path="/ekosistem"
      title={eco.titleRest}
      subtitle={eco.subtitle}
      image="/headers/ekosistem.webp"
    >
      <div className="page-wrap">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eco.projects.map((p) => (
            <article
              key={p.name}
              id={slugOf(p.image)}
              className="group scroll-mt-28 overflow-hidden rounded-card border border-white/10 bg-primary"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-65 mix-blend-luminosity transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary/25 to-transparent" />
                <span
                  className={cn(
                    'absolute left-5 top-5 inline-block rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm',
                    statusClass(p.statusKey),
                  )}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold leading-snug text-white">{p.name}</h2>
                <p className="mt-2 leading-relaxed text-white/70">{p.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RoutePage>
  )
}
