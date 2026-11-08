import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface SectionCTAProps {
  /** Short caption on the left. Optional. */
  caption?: string
  /** Required link label on the right. */
  linkLabel: string
  /** Destination (pass locale-prefixed, e.g. `/ht/travay-nou`). */
  link?: string
  /** `light` for white sections, `dark` for always-dark sections. */
  tone?: 'light' | 'dark'
}

/**
 * Section end-row — React port of the Angular `app-section-cta`: a short caption
 * on the left, a divider line, and an animated "text ↗" link on the right.
 * Adapts to light or dark sections via `tone`.
 */
export function SectionCTA({
  caption = '',
  linkLabel,
  link = '/',
  tone = 'light',
}: SectionCTAProps) {
  const captionClass = tone === 'dark' ? 'text-white/50' : 'text-ink-soft'
  const lineClass = tone === 'dark' ? 'bg-white/15' : 'bg-black/10'
  const linkClass = 'text-accent'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
      {caption ? (
        <p className={cn('shrink-0 max-w-xs leading-relaxed', captionClass)}>{caption}</p>
      ) : null}
      <div className={cn('hidden sm:block flex-1 h-px', lineClass)} />
      <Link
        href={link}
        className={cn(
          'group relative inline-flex items-center gap-2 font-semibold pb-1',
          'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current',
          'after:transition-[width] after:duration-300 after:ease-out hover:after:w-full',
          linkClass,
        )}
      >
        {linkLabel}
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </Link>
    </div>
  )
}
