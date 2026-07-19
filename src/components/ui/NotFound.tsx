'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * 404 — the supplied component, rebuilt on this project's design system.
 *
 * It could not be pasted. It depends on shadcn's Button and Empty (neither
 * exists here) and on tokens this project does not define — --foreground,
 * --muted-foreground, --primary-foreground, --accent, --input, --ring,
 * --background. It also came with @radix-ui/react-avatar in its install list,
 * which nothing in it uses; that stays uninstalled.
 *
 * The drifting orbs are the good idea and they are kept — but in the site's own
 * ambient wash rather than the original's purple/indigo/pink, which belongs to
 * no part of this brand. The same blurred gold + navy orbs already sit behind
 * the spiral and "Passe à l'action", so a lost visitor lands somewhere that
 * still looks like the site.
 *
 * Dark, because near-black is this site's one dark surface and a 404 is a good
 * place to use it: gold reads at AAA on it, and the page cannot be mistaken for
 * a content page that failed to load.
 *
 * Strings are props — nothing here is in English by default.
 */
export interface NotFoundProps {
  code: string
  title: string
  lead: string
  homeLabel: string
  homeHref: string
  exploreLabel?: string
  exploreHref?: string
}

export function NotFound({
  code,
  title,
  lead,
  homeLabel,
  homeHref,
  exploreLabel,
  exploreHref,
}: NotFoundProps) {
  const reduce = useReducedMotion()

  // The original drifts both orbs forever. Honoured, but stilled entirely for
  // anyone who asked for less motion — an endless loop is the kind that matters.
  const drift = (x: number, y: number) =>
    reduce
      ? {}
      : {
          animate: { x: [0, x, -x, 0], y: [0, y, -y, 0] },
          transition: { repeat: Infinity, duration: 18, ease: 'easeInOut' as const },
        }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-20 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* the hero's navy wash, so this reads as the same material */}
        <span className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-12%,rgba(18,36,107,0.35)_0%,transparent_60%)]" />
        <motion.span
          {...drift(40, 20)}
          className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-gold/[0.09] blur-3xl"
        />
        <motion.span
          {...drift(-40, -20)}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-[clamp(4.5rem,18vw,9rem)] font-extrabold leading-none tracking-tight text-gold">
          {code}
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-tight tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 leading-relaxed text-white/65">{lead}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {/* gold leads on dark — navy would disappear into the ground, and red
              is spent on the support button in the nav */}
          <Button variant="gold" pill href={homeHref}>
            <Home className="h-4 w-4" aria-hidden="true" />
            {homeLabel}
          </Button>
          {exploreLabel && exploreHref && (
            <Button variant="ghost" pill href={exploreHref}>
              <Compass className="h-4 w-4" aria-hidden="true" />
              {exploreLabel}
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
