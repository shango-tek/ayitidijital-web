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
    ? 'border-transparent bg-electric text-white'
    : k === 'dev'
      ? 'border-white/25 bg-white/15 text-white/85'
      : 'border-white/15 bg-white/5 text-white/60'

/**
 * "Écosystème" — the full incubated-projects list, in the house
 * register. Each project is an anchored card (id = its slug), so a home card
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
      title={c.pageTitles.ecosystem}
      subtitle={eco.subtitle}
      image="/headers/ekosistem.webp"
    >
      <div className="page-wrap">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eco.projects.map((p) => (
            <article
              key={p.name}
              id={slugOf(p.image)}
              className="group scroll-mt-28 overflow-hidden border-4 border-double border-tum-ink bg-tum-ink"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tum-ink via-tum-ink/40 to-transparent" />
                <span
                  className={cn(
                    'absolute left-5 top-5 inline-block border px-2.5 py-1 font-tum text-[10px] font-bold uppercase tracking-wider',
                    statusClass(p.statusKey),
                  )}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-tum text-xl font-extrabold leading-snug text-white">{p.name}</h2>
                <p className="mt-2 font-tum leading-relaxed text-white/70">{p.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RoutePage>
  )
}
