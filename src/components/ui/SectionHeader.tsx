import { cn } from '@/lib/utils'
import { Kicker } from './Kicker'

export interface SectionHeaderProps {
  /** Eyebrow / kicker above the title. */
  label?: string
  title: string
  /** Optional leading word rendered as an outlined italic accent (e.g. "Découvre"). */
  strokeWord?: string
  subtitle?: string
  /** `stacked` = label→title→subtitle vertical. `split` = title left, subtitle right (desktop). */
  variant?: 'stacked' | 'split'
  size?: 'sm' | 'md'
  /** Light text for placing on dark surfaces. */
  onDark?: boolean
  className?: string
}

/**
 * Reusable section header — React port of the Angular `app-section-header`.
 * Eyebrow (mono/accent) + display title + optional subtitle, in a stacked or
 * split (title left / subtitle right) layout, sized sm or md.
 */
export function SectionHeader({
  label,
  title,
  strokeWord,
  subtitle,
  variant = 'stacked',
  size = 'md',
  onDark = false,
  className,
}: SectionHeaderProps) {
  const titleSize =
    size === 'sm'
      ? 'text-[clamp(1.6rem,3.2vw,2.4rem)]'
      : 'text-[clamp(2rem,4.6vw,3.25rem)]'

  return (
    <div
      className={cn(
        variant === 'split'
          ? 'flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'
          : 'flex flex-col',
        className,
      )}
    >
      <div className={variant === 'split' ? 'max-w-2xl' : ''}>
        {label ? (
          <div className={cn('mb-2', onDark && 'on-dark')}>
            <Kicker label={label} red />
          </div>
        ) : null}
        <h2
          className={cn(
            'font-display font-extrabold leading-[1.08] tracking-tight',
            titleSize,
            onDark ? 'text-white' : 'text-primary',
          )}
        >
          {strokeWord ? (
            <span
              className={cn(
                'italic text-transparent',
                onDark
                  ? '[-webkit-text-stroke:1.2px_#fff]'
                  : '[-webkit-text-stroke:1.5px_var(--color-primary)]',
              )}
            >
              {strokeWord}{' '}
            </span>
          ) : null}
          {title.replace(/\.\s*$/, '')}
          {/* gold-deep (#9C6400) is the AA-legible gold for text on light; keep the
              bright gold only when the header sits on a dark surface */}
          <span className={onDark ? 'text-gold' : 'text-gold-deep'}>.</span>
        </h2>
      </div>
      {subtitle ? (
        <p
          className={cn(
            'text-base leading-relaxed',
            variant === 'split'
              ? 'lg:max-w-2xl lg:text-right'
              : 'mt-4 max-w-2xl lg:text-lg',
            onDark ? 'text-white/60' : 'text-ink-soft',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
