import type { ReactNode } from 'react'

export type ButtonVariant = 'sand' | 'ghost' | 'navy' | 'red' | 'gold'

export interface ButtonProps {
  variant: ButtonVariant
  href: string
  children: ReactNode
  size?: 'sm'
  pill?: boolean
  external?: boolean
  className?: string
}

/** Anchor styled as the espiral hard-shadow button. Variants: sand, ghost (on dark), navy, red. */
export function Button({ variant, href, children, size, pill, external, className }: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : null,
    pill ? 'btn-pill' : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <a className={classes} href={href} rel={external ? 'noopener' : undefined}>
      {children}
    </a>
  )
}
