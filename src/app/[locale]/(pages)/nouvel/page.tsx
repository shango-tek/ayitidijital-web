'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/**
 * "Nouvèl & evènman" — the news page. Was an empty RoutePage (header, no body),
 * while the home Journal teaser linked at /jounal, which was never a route.
 * Both now land here: each post is an anchored card (#post-1 …), so a card on
 * the home page opens the matching entry.
 *
 * Posts have no individual article pages yet, so the cards are not links — an
 * honest dead end beats three cards that all reopen the same page.
 */
export default function NouvelPage() {
  const { content: c } = useLocale()
  const j = c.journal

  return (
    <RoutePage path="/nouvel" subtitle={j.subtitle} image="/headers/nouvel.webp">
      <div className="page-wrap">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {j.posts.map((post, i) => (
            <article
              key={post.title}
              id={`post-${i + 1}`}
              className="flex scroll-mt-28 flex-col overflow-hidden rounded-card border border-black/[0.06] bg-white shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-primary-deep">
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft/70">
                  {post.date}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-primary">
                  {post.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RoutePage>
  )
}
