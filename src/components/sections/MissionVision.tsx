'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Kicker } from '../ui/Kicker'

export interface Pillar {
  name: string
  body: string
}

export interface MissionVisionProps {
  id?: string
  /** Eyebrow above the sticky label (pixel-dot Kicker). */
  label: string
  /** The pillars — Mission / Vision / Conviction (built for exactly three). */
  items: Pillar[]
  /** One visual per pillar (same order as `items`) — swaps with the active card. */
  images: string[]
}

/** Brand-adapted card palette (soft blue → white → gold), navy ink. */
const CARD_STYLES = [
  { bg: '#B9C6F2', title: 'var(--color-primary)', body: 'var(--color-primary)' },
  { bg: '#FFFFFF', title: 'var(--color-primary)', body: 'var(--color-ink-soft)' },
  { bg: 'var(--color-gold)', title: 'var(--color-primary)', body: 'var(--color-primary)' },
]

/**
 * "Who we are" — Mission / Vision / Conviction. A pinned section where each later
 * card slides up and FULLY covers the previous one as you scroll (scroll-scrubbed),
 * while the left column tracks the active card with a rolling label + a photo that
 * crossfades to match.
 */
export function MissionVision({ id, label, items, images }: MissionVisionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Card 2 (Vision) covers card 1, then card 3 (Conviction) covers card 2 — each
  // scrubbed over its own slice, with a stable "fully covered" beat in between.
  const yVision = useTransform(scrollYProgress, [0.16, 0.42], ['210%', '0%'])
  const yConviction = useTransform(scrollYProgress, [0.58, 0.84], ['210%', '0%'])
  const cardY: (string | typeof yVision)[] = ['0%', yVision, yConviction]

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(p < 0.42 ? 0 : p < 0.84 ? 1 : 2)
  })

  return (
    <section
      id={id}
      ref={ref}
      className="relative bg-white"
      style={{ height: `${items.length * 82}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden py-16 lg:py-0">
        <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
            {/* LEFT — title + label on top, alternating visual below */}
            <div>
              <Kicker label={label} red />
              <div className="relative mt-5 h-[1.15em] w-full overflow-hidden font-serif text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-none tracking-tight text-primary">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={items[active]?.name}
                    initial={{ y: '115%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-115%' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center whitespace-nowrap"
                  >
                    {items[active]?.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex items-center gap-3 font-mono text-sm text-ink-soft">
                <span className="tabular-nums">0{active + 1}</span>
                <span className="h-px w-10 bg-primary/25" />
                <span className="tabular-nums">0{items.length}</span>
              </div>

              {/* Alternating visual — swaps with the active pillar */}
              <div className="relative mt-7 hidden h-[32vh] w-full overflow-hidden rounded-[1.5rem] bg-sand shadow-[0_24px_60px_-40px_rgba(10,20,60,0.5)] ring-1 ring-black/[0.05] sm:block lg:mt-9">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={images[active]}
                    src={images[active]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — cards stacked in place; each later card slides up to cover */}
            <div className="relative h-[40vh] min-h-[300px]">
              {items.map((item, i) => {
                const s = CARD_STYLES[i % CARD_STYLES.length]
                return (
                  <motion.article
                    key={item.name}
                    style={{ y: cardY[i] ?? '0%', zIndex: i, background: s.bg }}
                    className="absolute inset-0 flex flex-col rounded-[1.75rem] p-7 shadow-[0_30px_70px_-45px_rgba(10,20,60,0.55)] ring-1 ring-black/[0.06] md:p-10"
                  >
                    <h3
                      className="font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-none tracking-tight"
                      style={{ color: s.title }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="mt-8 max-w-2xl text-base leading-relaxed md:text-xl"
                      style={{ color: s.body }}
                    >
                      {item.body}
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
