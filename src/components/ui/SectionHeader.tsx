import { cn } from '@/lib/utils'
import { Reveal, RevealRule } from './Reveal'

export interface SectionHeaderProps {
  /** Eyebrow / kicker above the title. */
  label?: string
  title: string
  /** Legacy accent word — now folded into one clean grotesk line (kept for call-site compatibility). */
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
 * Section header in the Sui register: a mono eyebrow led by a short hairline
 * mark, one clean grotesk line (the old outlined-italic accent word is folded
 * back in), an optional lead, and a hairline rule that draws in beneath. The
 * whole header lifts into view. Replaces the AD split header's outline-word
 * treatment — see `Reveal` for the motion contract.
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
      ? 'text-[clamp(1.6rem,3.1vw,2.3rem)]'
      : 'text-[clamp(2rem,4.4vw,3.1rem)]'

  const heading = `${strokeWord ? `${strokeWord} ` : ''}${title.replace(/\.\s*$/, '')}`

  return (
    <div className={className}>
      <Reveal
        className={cn(
          variant === 'split'
            ? 'flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'
            : 'flex flex-col',
        )}
      >
        <div className={variant === 'split' ? 'max-w-2xl' : ''}>
          {label ? (
            <div className="mb-4 flex items-center gap-3">
              <span className={cn('h-px w-7', onDark ? 'bg-[#4DA2FF]/60' : 'bg-[#2663EB]/50')} />
              <span
                className={cn(
                  'font-mono text-[11px] uppercase tracking-[0.24em]',
                  onDark ? 'text-[#4DA2FF]' : 'text-[#2663EB]',
                )}
              >
                {label}
              </span>
            </div>
          ) : null}
          <h2
            className={cn(
              'font-display font-semibold leading-[1.1] tracking-tight',
              titleSize,
              onDark ? 'text-white' : 'text-[#101317]',
            )}
          >
            {heading}
            <span className={onDark ? 'text-[#4DA2FF]' : 'text-[#2663EB]'}>.</span>
          </h2>
        </div>
        {subtitle ? (
          <p
            className={cn(
              'text-[15px] leading-relaxed',
              variant === 'split'
                ? 'lg:max-w-sm lg:pb-1 lg:text-right'
                : 'mt-4 max-w-2xl lg:text-lg',
              onDark ? 'text-white/55' : 'text-[#5A6372]',
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </Reveal>
      <RevealRule className={cn('mt-8 w-full', onDark ? 'bg-white/10' : 'bg-black/10')} />
    </div>
  )
}
