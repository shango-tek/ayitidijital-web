import * as React from 'react'
import { cn } from '@/lib/utils'
import { Kicker } from './Kicker'

/**
 * Team section — the supplied shadcn component, rebuilt on this project's design
 * system.
 *
 * It could not be pasted as-is. It is written for a shadcn theme and every token
 * it reaches for is undefined here: --background, --muted-foreground, --card,
 * --destructive, --warning, --primary-foreground, --ring. `bg-card` and the
 * inline `hsl(var(--destructive)/0.1)` would have resolved to nothing and the
 * cards would have rendered as unstyled boxes. Rather than bolt a second,
 * competing token set onto a site that already has a complete one, the structure
 * and the interaction are kept and the surfaces are the site's own — sand, white
 * and navy, with the standard card radius.
 *
 * Three other departures from the original, each deliberate:
 *
 *  - No photographs. This page names real people. Dropping stock portraits of
 *    unrelated humans under their names would misrepresent them to every
 *    visitor, and a real photo needs the subject's consent (§ 22 KunstUrhG).
 *    Members render as a monogram until real, cleared portraits exist; pass
 *    `imageSrc` and the monogram gives way to the photo.
 *  - No hardcoded copy. The original hardcodes "O U R", "REGISTER NOW" and
 *    "www.website.com". This site is trilingual, so every string is a prop.
 *  - Groups, not one flat grid. Only the Vorstand is vertretungsberechtigt, so
 *    the § 26 BGB note has to sit with them and not over everyone.
 */

export interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
}

export interface TeamMember {
  name: string
  designation: string
  /** Optional. Absent → a monogram, never a stand-in stranger. */
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
  /** Sits under the first group — where a legal note belongs, not under all. */
  note?: string
}

/** Two letters, from the first and last word — "Corvil D. Telsaint" → CT. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0]![0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]![0] ?? '') : ''
  return (first + last).toUpperCase()
}

/* The accent rotates so a row of cards is not monotonous. Gold-deep and navy
   both clear AA on these grounds; red is skipped on purpose — it is reserved
   for the one primary action per view. */
const ACCENTS = [
  { disc: 'bg-primary text-white', ring: 'group-hover:border-primary' },
  { disc: 'bg-gold-deep text-white', ring: 'group-hover:border-gold-deep' },
  { disc: 'bg-primary-deep text-white', ring: 'group-hover:border-primary-deep' },
] as const

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length]!
  const tinted = index % 2 === 0

  return (
    <article
      className={cn(
        'group relative flex flex-col items-center overflow-hidden rounded-card p-8 text-center transition-transform duration-300 ease-out hover:-translate-y-1',
        tinted
          ? 'bg-sand'
          : 'border border-black/[0.06] bg-white shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]',
      )}
    >
      {/* the original's rising wash, in brand navy */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 origin-bottom scale-y-0 rounded-t-[50%] bg-gradient-to-t from-primary/10 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      <div
        className={cn(
          'relative z-10 grid h-28 w-28 place-items-center overflow-hidden rounded-full border-4 border-transparent transition-all duration-500 ease-out group-hover:scale-105',
          accent.ring,
          member.imageSrc ? 'bg-white' : accent.disc,
        )}
      >
        {member.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.imageSrc}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <span aria-hidden="true" className="font-display text-2xl font-extrabold tracking-tight">
            {initials(member.name)}
          </span>
        )}
      </div>

      <h4 className="relative z-10 mt-5 font-display text-xl font-bold tracking-tight text-primary">
        {member.name}
      </h4>
      <p className="relative z-10 mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
        {member.designation}
      </p>

      {member.socialLinks && member.socialLinks.length > 0 && (
        <div className="relative z-10 mt-4 flex gap-3">
          {member.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} — ${link.label}`}
              className="text-ink-soft transition-colors hover:text-primary"
            >
              <link.icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  ({ eyebrow, description, groups, note, className, ...props }, ref) => {
    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        className={cn('relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-[100px]', className)}
        {...props}
      >
        <div className="relative z-10 mx-auto max-w-[90rem] px-5 md:px-10">
          {eyebrow && (
            <Kicker label={eyebrow} red />
          )}
          {description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{description}</p>
          )}

          {/* One row on a computer, whatever group a person is in. The groups
              are still real — they are why the note below exists — but they no
              longer need their own headings to stay accurate: the note names
              the Vorstand explicitly and states that coordination carries no
              power of representation, so it cannot be read as covering someone
              it does not apply to. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {groups
              .flatMap((group) => group.members)
              .map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} />
              ))}
          </div>
          {note && (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-soft/85">{note}</p>
          )}
        </div>
      </section>
    )
  },
)

TeamSection.displayName = 'TeamSection'
