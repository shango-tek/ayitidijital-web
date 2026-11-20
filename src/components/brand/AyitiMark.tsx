import type { CSSProperties } from 'react'
import { AYITI_MARK_SVG, AYITI_MARK_VIEWBOX } from './ayitiMarkSvg'

export interface AyitiMarkProps {
  size?: number | string
  className?: string
  /**
   * 'intro': the mark draws itself once (A, emblem, circuit with a travelling spark).
   * 'loop': loader — sparks keep running through the circuit.
   * 'none' (default): static.
   */
  motion?: 'none' | 'intro' | 'loop'
  /** A spark runs through the circuit when the mark, or the link it sits directly in, is hovered. */
  hover?: boolean
  /** Intro speed multiplier: 1 ≈ 2.5 s, 0.5 ≈ 1.25 s. */
  speed?: number
  /** Accessible name; omit for a decorative mark next to the brand name. */
  title?: string
}

/**
 * The Ayiti Dijital mark as inline SVG (server-renderable, no client JS). Colours and motion
 * live in src/styles/ayiti-logo.css; it recolours itself on the site's dark surfaces (header,
 * footer, hero, boot loader). Respects prefers-reduced-motion.
 */
export function AyitiMark({ size = 58, className, motion = 'none', hover = true, speed, title }: AyitiMarkProps) {
  const cls = ['ad-mark', motion === 'intro' && 'ad-intro', motion === 'loop' && 'ad-loop', hover && 'ad-hover', className]
    .filter(Boolean)
    .join(' ')
  return (
    <svg
      viewBox={AYITI_MARK_VIEWBOX}
      width={size}
      height={size}
      className={cls}
      style={speed ? ({ '--ad-k': speed } as CSSProperties) : undefined}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: AYITI_MARK_SVG }}
    />
  )
}
