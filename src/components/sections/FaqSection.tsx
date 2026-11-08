'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

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

/**
 * FAQ — a white section over a sharp-cornered accordion in the UnternehmerTUM
 * register: black-bordered cards, Albert Sans questions, an electric plus/close
 * tile. First item open. Open state and props are unchanged from the Sui version.
 */
export function FaqSection({ id, label, strokeWord, titleRest, subtitle, items }: FaqSectionProps) {
  const [open, setOpen] = useState(0)

  return (
    <section id={id} className="bg-tum-paper py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
            <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
            {label}
          </span>
          <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
            <span className="font-serif italic font-semibold text-electric">{strokeWord}</span> {titleRest}
          </h2>
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{subtitle}</p>
        </Reveal>

        <RevealGroup className="mt-12 flex flex-col gap-4 lg:mt-16">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <RevealItem key={item.q}>
                <div className={cn('overflow-hidden border-4 border-double transition-colors', isOpen ? 'border-electric' : 'border-tum-ink')}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 bg-tum-paper px-6 py-5 text-left lg:px-8 lg:py-6"
                    >
                      <span className="font-tum text-lg font-bold tracking-tight text-tum-ink lg:text-xl">{item.q}</span>
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center text-white transition-colors',
                          isOpen ? 'bg-electric' : 'bg-tum-ink',
                        )}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden="true"
                          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-45')}
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
                      <p className="px-6 pb-6 font-tum leading-relaxed text-tum-muted lg:px-8">{item.a}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
