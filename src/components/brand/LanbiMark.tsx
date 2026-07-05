'use client'

import { useId } from 'react'
import type { CSSProperties } from 'react'
import { LANBI_DOTS, LANBI_DIAMOND } from './lanbiDots'

const NAVY = '#12246B'
const RED = '#D21034'

export interface LanbiMarkProps {
  size?: number | string
  className?: string
  /** Render a solid-white monochrome mark (for dark/navy surfaces). */
  light?: boolean
}

/**
 * The dotted lanbi mark as inline SVG (flag colours). Static by default; a
 * parent `:hover` can trigger a ripple that sweeps the dots inside→out — each
 * dot carries its spiral rank in the `--r` custom property for the CSS stagger.
 * See `.lanbi` rules in radiant-parts.css. Pass `light` for a white mark on
 * dark surfaces.
 */
export function LanbiMark({ size = 58, className, light = false }: LanbiMarkProps) {
  const clip = useId()
  return (
    <svg
      viewBox="0 0 1475 1472"
      width={size}
      height={size}
      className={`lanbi ${className ?? ''}`.trim()}
      aria-hidden="true"
    >
      <clipPath id={clip}>
        <path d={LANBI_DIAMOND} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <g transform="translate(25 28)">
          {LANBI_DOTS.map((dot, i) => (
            <path
              key={i}
              d={dot.d}
              fill={light ? '#fff' : dot.top ? NAVY : RED}
              style={{ '--r': dot.r } as CSSProperties}
            />
          ))}
        </g>
      </g>
    </svg>
  )
}
