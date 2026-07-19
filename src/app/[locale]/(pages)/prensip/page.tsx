'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { RoutePage } from '@/components/pages/RoutePage'
import { Kicker } from '@/components/ui/Kicker'
import { useContent } from '@/components/i18n/LocaleProvider'

/**
 * "Prensip" — the convictions. Four numbered principles, revealed one at a time
 * as you scroll, matching the Istwa nou treatment on the About page: same rule
 * that draws in, same lift, same one-beat-per-item restraint.
 *
 * Numbered because the source copy numbers them, and because four convictions
 * read as a set you can hold rather than an open-ended list.
 */
export default function PrensipPage() {
  const c = useContent()
  const p = c.principlesPage
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
    <RoutePage path="/prensip" subtitle={p.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <Kicker label={p.label} red />

          {/* Same floor as Istwa nou: whileInView writes its start state into the
              server HTML, so without JS this page would be an empty column. */}
          <noscript>
            <style
              dangerouslySetInnerHTML={{
                __html: '.prensip-item{opacity:1!important;transform:none!important}.prensip-rule{transform:scaleX(1)!important}',
              }}
            />
          </noscript>

          <ol className="mt-10 lg:mt-14">
            {p.items.map((item, i) => (
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
        </div>
      </section>
    </RoutePage>
  )
}
