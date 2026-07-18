import type { ReactNode } from 'react'

export type ButtonVariant = 'sand' | 'ghost' | 'navy' | 'red' | 'gold' | 'gold-outline'

interface CommonProps {
  variant: ButtonVariant
  children: ReactNode
  size?: 'sm'
  pill?: boolean
  /** Append the shared forward-arrow glyph. */
  arrow?: boolean
  className?: string
}

interface LinkButton extends CommonProps {
  /** Renders an <a>. Mutually exclusive with `type`/`onClick`. */
  href: string
  external?: boolean
  type?: never
  onClick?: never
}

interface ActionButton extends CommonProps {
  /** Renders a <button> — for form submits and JS actions. */
  href?: undefined
  type?: 'button' | 'submit'
  onClick?: () => void
  /** Submits are disabled while in flight, so the primitive has to support it. */
  disabled?: boolean
  external?: never
}

export type ButtonProps = LinkButton | ActionButton

/** One shared forward arrow, so every CTA uses the same glyph (see `arrow`). */
export function CtaArrow() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * The one button primitive. Signature interaction is the `.btn` hard-shadow
 * hover (translate + a colour-matched offset shadow) shared by every variant —
 * so gold CTAs that used to be hand-rolled with a soft lift now move the same
 * way. Renders an <a> when given `href`, otherwise a <button> (for submits).
 *
 * Variants: sand · ghost (on dark) · navy · red · gold (fill) · gold-outline
 * (gold-deep outline on light, fills on hover).
 */
export function Button(props: ButtonProps) {
  const { variant, children, size, pill, arrow, className } = props
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : null,
    pill ? 'btn-pill' : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {children}
      {arrow ? <CtaArrow /> : null}
    </>
  )

  if (props.href !== undefined) {
    return (
      <a
        className={classes}
        href={props.href}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {inner}
    </button>
  )
}
