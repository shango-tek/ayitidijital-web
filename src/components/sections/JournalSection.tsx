import { SectionHeader } from '../ui/SectionHeader'
import { SectionCTA } from '../ui/SectionCTA'

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
 * "Le Journal" — blog teaser. React port of the Angular home `app-blog`: split
 * header, three article cards (image + category badge, date, title, read-more),
 * and an outline "all articles" button.
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
  return (
    <section id={id} className="bg-white py-16 md:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeader
          variant="split"
          size="md"
          label={label}
          strokeWord={strokeWord}
          title={titleRest}
          subtitle={subtitle}
        />

        {/* A grid everywhere except a tablet held upright, where it becomes the
            same snap-scrolling track as the ecosystem carousel: two posts on
            screen, the third peeking past the right edge to advertise the swipe.
            Three squeezed columns don't fit that width, and two-up leaves the
            third post stranded alone on a second row. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7 tablet-portrait:flex tablet-portrait:snap-x tablet-portrait:snap-mandatory tablet-portrait:overflow-x-auto tablet-portrait:pb-1 tablet-portrait:[scrollbar-width:none] tablet-portrait:[&::-webkit-scrollbar]:hidden">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              className="group flex flex-col overflow-hidden rounded-card border border-black/[0.06] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_70px_-40px_rgba(10,58,96,0.45)] tablet-portrait:w-[46%] tablet-portrait:shrink-0 tablet-portrait:snap-start"
            >
              {/* Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-primary-deep">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                  {post.category}
                </span>
              </div>
              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft/70">{post.date}</p>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-primary transition-colors group-hover:text-gold-deep">
                  {post.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
                  {readMore}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all — shared section end-row CTA (matches Work / Ecosystem) */}
        <div className="mt-14">
          <SectionCTA tone="light" linkLabel={viewAll} link={viewAllHref} />
        </div>
      </div>
    </section>
  )
}
