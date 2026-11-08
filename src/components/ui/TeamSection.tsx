import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Team section — house register. Members render as sharp, double-lined
 * photo placeholders for now (no names), on a white ground. Props are unchanged
 * so the page + all three locales keep working.
 */

export interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
}

export interface TeamMember {
  name: string
  designation: string
  imageSrc?: string
  socialLinks?: SocialLink[]
}

export interface TeamGroup {
  label: string
  members: TeamMember[]
}

export interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  description?: string
  groups: TeamGroup[]
  /** Kept in the type for compatibility; no longer rendered. */
  note?: string
}

/** Placeholder portrait — a plain lavender image slot with the same double-line
    border as the cards; no name until cleared photos exist. */
function MemberPlaceholder() {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden border-4 border-double border-tum-ink bg-lavender transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-electric">
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-tum-ink/25">
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="12" cy="8.5" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6.2 7.5-6.2S19.5 16 19.5 20" strokeLinecap="round" />
        </svg>
      </span>
    </article>
  )
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  ({ eyebrow, description, groups, note: _note, className, ...props }, ref) => {
    const members = groups.flatMap((group) => group.members)
    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        className={cn('relative w-full overflow-hidden bg-tum-paper py-16 md:py-20 lg:py-[100px]', className)}
        {...props}
      >
        <div className="relative z-10 mx-auto max-w-[90rem] px-5 md:px-10">
          {eyebrow && (
            <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
              <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          {description && (
            <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{description}</p>
          )}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {members.map((_, i) => (
              <MemberPlaceholder key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  },
)

TeamSection.displayName = 'TeamSection'
