'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeader } from '../ui/SectionHeader'
import { SectionPanel } from '../ui/SectionPanel'

export interface FaqItem {
  q: string
  a: string
}

export interface FaqSectionProps {
  id?: string
  label: string
  strokeWord: string
  titleRest: string
  subtitle: string
  items: FaqItem[]
}

/** FAQ — split header (title left, lead right) over an accordion. First item open. */
export function FaqSection({ id, label, strokeWord, titleRest, subtitle, items }: FaqSectionProps) {
  const [open, setOpen] = useState(0)

  return (
    <SectionPanel id={id}>
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <SectionHeader
          variant="split"
          size="md"
          label={label}
          strokeWord={strokeWord}
          title={titleRest}
          subtitle={subtitle}
        />

        <div className="mt-12 flex flex-col gap-4 lg:mt-16">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                // White, not the old #F7F9FC: the rows sit on the warm sand
                // panel now, and a cool grey-blue on warm beige reads as muddy.
                // White rows lift off it cleanly — the same white-cards-on-sand
                // logic as the Domaines grid.
                className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left lg:px-8 lg:py-6"
                  >
                    <span className="font-display text-lg font-semibold text-primary lg:text-xl">{item.q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                        className={cn('h-4 w-4 text-primary transition-transform duration-300', isOpen && 'rotate-45')}
                      >
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    {/* Full measure, matching the statutory pages' accordion. */}
                    <p className="px-6 pb-6 leading-relaxed text-ink-soft lg:px-8">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
