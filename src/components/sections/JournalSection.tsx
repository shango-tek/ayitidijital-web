'use client'

import { useRef } from 'react'
import { Reveal } from '../ui/Reveal'

export interface JournalPost {
  category: string
  date: string
  title: string
  image: string
  href: string
}

export interface JournalSectionProps {
  id?: string
  label: string
  strokeWord: string
  titleRest: string
  subtitle: string
  readMore: string
  viewAll: string
  viewAllHref: string
  posts: JournalPost[]
}

/**
 * "Le Journal" — blog teaser in the house register: a lavender section,
 * sharp-cornered white article cards with a black border, electric category
 * pills and read-more, Albert Sans throughout. The tablet-portrait snap track
 * and 380px nudge are unchanged from the Sui version, as are the props.
 */
export function JournalSection({
  id,
  label,
  strokeWord,
  titleRest,
  subtitle,
  readMore,
  viewAll,
  viewAllHref,
  posts,
}: JournalSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <section id={id} className="bg-lavender py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
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

        <Reveal>
          <div
            ref={trackRef}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7 tablet-portrait:flex tablet-portrait:snap-x tablet-portrait:snap-mandatory tablet-portrait:overflow-x-auto tablet-portrait:pb-1 tablet-portrait:[scrollbar-width:none] tablet-portrait:[&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => (
              <a
                key={post.title}
                href={post.href}
                className="group flex flex-col overflow-hidden border-4 border-double border-tum-ink bg-tum-paper transition-transform duration-200 hover:-translate-y-1 tablet-portrait:w-[46%] tablet-portrait:shrink-0 tablet-portrait:snap-start"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-tum-ink">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center bg-electric px-3 py-1 font-tum text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                    {post.category}
                  </span>
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-tum text-xs font-bold uppercase tracking-[0.15em] text-tum-muted">{post.date}</p>
                  <h3 className="mt-3 font-tum text-xl font-extrabold leading-snug text-tum-ink transition-colors group-hover:text-electric">
                    {post.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-tum text-xs font-bold uppercase tracking-[0.14em] text-electric">
                    {readMore}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Prev / next — only where the grid above is a scrolling track (tablet portrait) */}
        <div className="mt-6 hidden items-center justify-center gap-3 tablet-portrait:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              className="flex h-11 w-11 items-center justify-center border-2 border-tum-ink text-tum-ink transition-colors duration-200 hover:bg-tum-ink hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 flex justify-center">
          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-2.5 border-2 border-tum-ink px-7 py-4 font-tum text-sm font-bold uppercase tracking-wide text-tum-ink transition-colors duration-200 hover:bg-tum-ink hover:text-white"
          >
            {viewAll}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
