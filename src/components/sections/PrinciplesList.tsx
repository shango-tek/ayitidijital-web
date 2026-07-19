'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * The scroll-revealed principles list — the only part of /prensip that needs
 * the client, so it is the only part that ships as one. Same treatment as
 * Istwa nou on the About page: a rule that draws in, one lift, one beat per
 * item.
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
            className="prensip-rule absolute inset-x-0 top-0 h-px origin-left bg-black/[0.09]"
          />
          <span
            aria-hidden="true"
            className="font-display text-3xl font-extrabold leading-none text-primary/20 lg:text-4xl"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-snug tracking-tight text-primary lg:text-[1.9rem]">
              {item.title}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{item.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
