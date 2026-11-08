'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Clock, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Timeline — a self-drawing rail with staggered entries and status glyphs, in the
 * house register: sharp-cornered cards, Albert Sans, an electric rail and
 * current-state, near-black "done", muted "upcoming". Structure, motion and props
 * are unchanged.
 */

export interface TimelineItem {
  title: string
  description: string
  /** Small label above the title — a phase name, not a date. */
  category?: string
  status: 'done' | 'current' | 'upcoming'
}

export interface TimelineProps {
  items: TimelineItem[]
  /** Localised names for the three states. */
  statusLabels: Record<TimelineItem['status'], string>
  className?: string
}

const STATUS = {
  done: { Icon: CheckCircle, dot: 'bg-tum-ink text-white', chip: 'border-tum-ink/25 text-tum-ink' },
  current: { Icon: Clock, dot: 'bg-electric text-white', chip: 'border-electric/40 text-electric' },
  upcoming: { Icon: Circle, dot: 'bg-tum-paper text-tum-muted border-2 border-tum-ink', chip: 'border-tum-ink/20 text-tum-muted' },
} as const

export function Timeline({ items, statusLabels, className }: TimelineProps) {
  const reduce = useReducedMotion()
  if (!items || items.length === 0) return null

  const EASE = [0.16, 1, 0.3, 1] as const
  const entry = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 } as const,
        transition: { duration: 0.55, ease: EASE },
      }
  const rail = reduce
    ? {}
    : {
        initial: { scaleY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, amount: 0.1 } as const,
        transition: { duration: 1.2, ease: 'easeOut' as const, delay: 0.15 },
      }

  return (
    <ol className={cn('relative', className)}>
      <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-px bg-tum-ink/[0.12] md:left-8" />
      <motion.span
        aria-hidden="true"
        {...rail}
        className="timeline-rail absolute bottom-0 left-6 top-0 w-px origin-top bg-electric md:left-8"
      />

      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: '.timeline-entry{opacity:1!important;transform:none!important}.timeline-rail{transform:scaleY(1)!important}',
          }}
        />
      </noscript>

      {items.map((item, i) => {
        const s = STATUS[item.status]
        return (
          <motion.li key={item.title} {...entry} className="timeline-entry relative flex gap-5 pb-8 last:pb-0 md:gap-7">
            {/* status glyph — sharp tile */}
            <span className={cn('relative z-10 grid h-12 w-12 shrink-0 place-items-center md:h-16 md:w-16', s.dot)}>
              <s.Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1 border-4 border-double border-tum-ink bg-tum-paper p-6 transition-colors duration-300 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  {item.category && (
                    <p className="font-tum text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
                      {item.category}
                    </p>
                  )}
                  <h3 className="mt-2 font-tum text-xl font-extrabold leading-snug tracking-tight text-tum-ink md:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <span className={cn('shrink-0 border px-3 py-1 font-tum text-[10px] font-bold uppercase tracking-[0.14em]', s.chip)}>
                  {statusLabels[item.status]}
                </span>
              </div>
              <p className="mt-3 max-w-2xl font-tum leading-relaxed text-tum-muted">{item.description}</p>
            </div>

            {i === items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-6 h-2.5 w-2.5 -translate-x-1/2 bg-electric md:left-8"
              />
            )}
          </motion.li>
        )
      })}
    </ol>
  )
}
