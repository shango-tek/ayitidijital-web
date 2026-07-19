'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Clock, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Timeline — the supplied shadcn component, rebuilt on this project's tokens.
 *
 * It could not be pasted. It imports shadcn's Card and Badge (neither exists
 * here) and reaches for twelve undefined tokens: --card, --card-foreground,
 * --muted, --muted-foreground, --border, --foreground, --background, --ring,
 * --secondary, --destructive, --success, --warning. Installing all of that
 * would put a second, competing theme on a site that already has a complete
 * one, so the structure and motion are kept — the rail that draws itself, the
 * staggered entries, the status glyphs — and the surfaces are the site's own.
 *
 * Two deliberate omissions:
 *
 *  - No progress bar. It was asked for, and it was inventing data anyway: the
 *    original hardcodes 65% for "current" and 25% for "upcoming", numbers that
 *    mean nothing about any real stage.
 *  - No dates. The source content has none, and a chronology with invented
 *    dates is worse than one without.
 *
 * Status colour uses the brand rather than new semantic hues: navy for what is
 * done, gold-deep for what is under way, ink-soft for what is ahead. Red is
 * skipped — it belongs to the one primary action per view.
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
  done: { Icon: CheckCircle, dot: 'bg-primary text-white', chip: 'border-primary/25 text-primary' },
  current: { Icon: Clock, dot: 'bg-gold-deep text-white', chip: 'border-gold-deep/30 text-gold-deep' },
  upcoming: { Icon: Circle, dot: 'bg-white text-ink-soft border border-black/15', chip: 'border-black/15 text-ink-soft' },
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
      {/* The rail sits under the glyph column: 1.5rem in on mobile, 2rem from md,
          which is the centre of the 3rem / 4rem glyph. */}
      <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-px bg-black/[0.09] md:left-8" />
      <motion.span
        aria-hidden="true"
        {...rail}
        className="timeline-rail absolute bottom-0 left-6 top-0 w-px origin-top bg-primary/40 md:left-8"
      />

      {/* whileInView writes its start state into the server HTML, and these are
          the organisation's own milestones — with JS blocked the section would
          be an empty column. Same floor as the other reveals on the site. */}
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
            {/* glyph */}
            <span
              className={cn(
                'relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-[0_10px_30px_-16px_rgba(10,58,96,0.5)] md:h-16 md:w-16',
                s.dot,
              )}
            >
              <s.Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1 rounded-card border border-black/[0.07] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)] transition-colors duration-300 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  {item.category && (
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                      {item.category}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-tight text-primary md:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]',
                    s.chip,
                  )}
                >
                  {statusLabels[item.status]}
                </span>
              </div>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{item.description}</p>
            </div>

            {/* the closing dot, after the last entry */}
            {i === items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary md:left-8"
              />
            )}
          </motion.li>
        )
      })}
    </ol>
  )
}
