'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal primitives in the house motion idiom (see PrinciplesList /
 * Timeline): one quiet lift as the element enters view, `once`, and fully inert
 * under `prefers-reduced-motion` — then they render as plain elements with no
 * transform, so nothing can get stranded at opacity 0.
 *
 * `whileInView` writes the hidden start-state into the server HTML, so the first
 * painted frame is already placed; the lift plays when the element scrolls in.
 * This is Sui's "silent precision" register: short, eased, understated.
 */
const EASE = [0.16, 1, 0.3, 1] as const

/** Single element: fade + rise as it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  amount = 0.3,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its <RevealItem> children into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  amount?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

const ITEM: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/** One staggered child of <RevealGroup>. Pass any grid-cell classes via className. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={ITEM}>
      {children}
    </motion.div>
  )
}

/** A hairline rule that draws in from the left — Sui's technical section divider. */
export function RevealRule({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div aria-hidden="true" className={`h-px ${className ?? ''}`} />
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`h-px origin-left ${className ?? ''}`}
    />
  )
}
