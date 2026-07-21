'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeader } from '../ui/SectionHeader'
import { SectionPanel } from '../ui/SectionPanel'
import { SectionCTA } from '../ui/SectionCTA'

export interface EcosystemProject {
  name: string
  tagline: string
  status: string
  statusKey: 'active' | 'dev' | 'soon'
  icon: 'book' | 'data' | 'cap' | 'map' | 'chart' | 'heart'
  image: string
  href: string
}

export interface EcosystemCarouselProps {
  id?: string
  label: string
  strokeWord: string
  titleRest: string
  subtitle: string
  outro: string
  viewAll: string
  viewAllHref: string
  projects: EcosystemProject[]
}

/* Heroicon-style glyphs, keyed to each project. */
const ICONS: Record<EcosystemProject['icon'], ReactNode> = {
  book: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  ),
  data: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  ),
  cap: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  ),
  map: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  ),
  heart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  ),
}

/** Status pill palette — light text on the dark image cards. */
function statusClass(key: EcosystemProject['statusKey']): string {
  switch (key) {
    case 'active':
      return 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
    case 'dev':
      return 'border-sky-400/40 bg-sky-400/15 text-sky-300'
    default:
      return 'border-white/15 bg-white/10 text-white/65'
  }
}

/**
 * "Explore our ecosystem" — a horizontal, snap-scrolling carousel of incubated
 * projects. React port of the Angular `ecosystem-grid`, re-skinned onto a white
 * section (the dark photo cards stay dark, for contrast). The track bleeds right
 * past the padded container; prev/next buttons nudge it 380px at a time.
 */
export function EcosystemCarousel({
  id,
  label,
  strokeWord,
  titleRest,
  subtitle,
  outro,
  viewAll,
  viewAllHref,
  projects,
}: EcosystemCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <SectionPanel id={id} className="relative">
      {/* Header — outline word + rest left, lead right (shared split header) */}
      <div className="mx-auto mb-12 max-w-[90rem] px-5 md:px-10 lg:mb-14">
        <SectionHeader
          variant="split"
          size="md"
          label={label}
          strokeWord={strokeWord}
          title={titleRest}
          subtitle={subtitle}
        />
      </div>

      {/* Carousel — first card aligns with the container, then bleeds off the right edge */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pr-10 pl-[max(20px,calc((100%_-_90rem)/2_+_40px))]"
      >
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="group block w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[360px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-card border border-white/10 bg-primary">
              {/* Photo — blue-tinted (luminosity blend over the navy card) */}
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-65 mix-blend-luminosity transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary/25 to-transparent" />

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/75 backdrop-blur-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={p.icon === 'data' ? 2 : 1.8}
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    {ICONS[p.icon]}
                  </svg>
                </div>

                <span
                  className={cn(
                    'mb-3 inline-block rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm',
                    statusClass(p.statusKey),
                  )}
                >
                  {p.status}
                </span>

                <h3 className="font-display text-xl font-bold leading-snug text-white">{p.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/65">{p.tagline}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Prev / next */}
      <div className="mx-auto mt-6 flex max-w-[90rem] items-center justify-center gap-3 px-5 md:px-10">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? 'Previous' : 'Next'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary/40 transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
            </svg>
          </button>
        ))}
      </div>

      {/* End row — caption | divider | CTA */}
      <div className="mx-auto mt-8 max-w-[90rem] px-5 md:px-10">
        <SectionCTA tone="light" caption={outro} linkLabel={viewAll} link={viewAllHref} />
      </div>
    </SectionPanel>
  )
}
