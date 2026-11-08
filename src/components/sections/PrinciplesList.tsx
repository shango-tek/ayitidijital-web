'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * The scroll-revealed principles list — the only part of /prensip that needs the
 * client. house register: oversized electric index numerals, Albert Sans
 * (font-tum) titles, a hairline rule that draws in. Props unchanged.
 */
export function PrinciplesList({ items }: { items: { title: string; body: string }[] }) {
  const reduce = useReducedMotion()

  const EASE = [0.16, 1, 0.3, 1] as const
  const inView = { once: true, amount: 0.4 } as const
  const card = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: inView,
        transition: { duration: 0.6, ease: EASE },
      }
  const rule = reduce
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: inView,
        transition: { duration: 0.8, ease: EASE },
      }

  return (
    <ol className="mt-10 lg:mt-14">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          {...card}
          className="prensip-item relative grid gap-x-8 gap-y-3 py-9 md:grid-cols-[5rem_1fr] lg:grid-cols-[7rem_1fr] lg:py-12"
        >
          <motion.span
            aria-hidden="true"
            {...rule}
            className="prensip-rule absolute inset-x-0 top-0 h-px origin-left bg-tum-ink/[0.12]"
          />
          <span
            aria-hidden="true"
            className="font-tum text-4xl font-black leading-none text-electric lg:text-5xl"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h2 className="font-tum text-2xl font-black leading-snug tracking-tight text-tum-ink lg:text-[1.9rem]">
              {item.title}
            </h2>
            <p className="mt-4 max-w-3xl font-tum leading-relaxed text-tum-muted">{item.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
