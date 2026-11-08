'use client'

import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import GlassyCarousel, { type GlassyCarouselItem } from '@/components/ui/glassy-coverflow-carousel'
import { Reveal } from '../ui/Reveal'

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
  /** "light" = white day cards; "brand" = dark ink cards with logo + status pill. */
  variant?: 'light' | 'brand'
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/* Real project logos (brand variant), keyed by project slug. Projects without a
   logo show no badge — cleaner than a generic glyph. Add more here as they land. */
const LOGOS: Record<string, string> = {
  lexhaiti: '/logos/lexhaiti.svg',
}

/**
 * "Explore our ecosystem" — the 21st `GlassyCarousel` coverflow in the TUM
 * register, with OUR square prev/next buttons driving it. "brand" variant: dark
 * ink cards with the project logo (where we have one), a status pill, the name
 * and tagline overlaid. Clicking a side card slides to it; the centre card opens
 * the project.
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
  variant = 'light',
}: EcosystemCarouselProps) {
  const last = projects.length - 1
  const [active, setActive] = useState(() => Math.floor(projects.length / 2))
  const go = (dir: 1 | -1) => setActive((a) => Math.min(last, Math.max(0, a + dir)))

  const items = useMemo<GlassyCarouselItem[]>(
    () =>
      projects.map((p) => ({
        id: slug(p.name),
        title: p.name,
        subtitle: p.status,
        description: p.tagline,
        image: p.image,
        href: p.href,
        accent: 'var(--color-electric)',
        logo: LOGOS[slug(p.name)],
        statusKey: p.statusKey,
      })),
    [projects],
  )

  const theme: CSSProperties =
    variant === 'brand'
      ? ({
          '--color-card': 'var(--color-tum-ink)',
          '--color-card-foreground': '#ffffff',
          '--color-border': 'color-mix(in srgb, #ffffff 14%, transparent)',
        } as CSSProperties)
      : ({
          '--color-card': '#ffffff',
          '--color-card-foreground': 'var(--color-tum-ink)',
          '--color-border': 'color-mix(in srgb, var(--color-tum-ink) 14%, transparent)',
        } as CSSProperties)

  return (
    <section id={id} className="relative overflow-hidden bg-lavender py-10 md:py-24 lg:py-32">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-[90rem] px-5 md:px-10 lg:mb-10">
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

      {/* Coverflow — our buttons drive it, dock hidden. */}
      <GlassyCarousel
        items={items}
        layout="poster"
        variant={variant}
        index={active}
        onIndexChange={setActive}
        showControls={false}
        label={label}
        className="font-tum"
        style={
          {
            height: 'clamp(470px, 64vh, 650px)',
            minHeight: '470px',
            maxHeight: 'none',
            paddingBottom: '0px',
            gridTemplateRows: '0px minmax(0,1fr) auto',
            '--carousel-background': 'transparent',
            '--color-foreground': 'var(--color-tum-ink)',
            '--color-muted-foreground': 'var(--color-tum-muted)',
            '--color-primary': 'var(--color-electric)',
            '--color-primary-foreground': '#ffffff',
            '--carousel-shadow-color': 'var(--color-tum-ink)',
            '--carousel-font-body': 'var(--font-tum)',
            '--carousel-font-display': 'var(--font-tum)',
            ...theme,
          } as CSSProperties
        }
      />

      {/* Prev / next — ours, driving the controlled index. */}
      <div className="relative mx-auto mt-4 flex max-w-[90rem] items-center justify-center gap-3 px-5 md:px-10">
        {([-1, 1] as const).map((dir) => {
          const disabled = dir === -1 ? active === 0 : active === last
          return (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              disabled={disabled}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              className="flex h-11 w-11 items-center justify-center border-2 border-tum-ink text-tum-ink transition-colors duration-200 hover:bg-tum-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-tum-ink"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          )
        })}
      </div>

      {/* End row — caption | CTA */}
      <div className="relative mx-auto mt-10 max-w-[90rem] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-5 border-t-2 border-tum-ink pt-7 sm:flex-row sm:items-center">
          <p className="max-w-xl font-tum text-lg font-medium text-tum-ink">{outro}</p>
          <a
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-2 font-tum text-sm font-bold uppercase tracking-wide text-electric"
          >
            {viewAll}
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
