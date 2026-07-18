'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { SpiralAnimation } from './spiral-animation'

/** Brand vocabulary spun into the spiral (same family as the word-field). */
const DEFAULT_WORDS = [
  'DEMOKRATIZE', 'DIJITALIZE', 'TRANSFÒME', 'KONEKTE', 'INOVASYON', 'TALAN',
  'ENPAK', 'AYITI', 'KONBIT', 'DYASPORA', 'LIBÈTE', 'KREYATIVITE', 'LIBRE',
]

const DEFAULT_CENTER_WORDS = ['Imagine', 'Build', 'Transform']

export interface SpiralGalaxyProps {
  /** Words spun into the spiral (joined with a separator, then repeated). */
  words?: string[]
  targetChars?: number
  centerWords?: string[]
}

/**
 * The fusion: the 3D-projected starfield (spiral-animation) as the deep
 * background, the text spiral zooming + rotating in front of it, and the
 * alternating word (Imagine / Transform / Build) in the eye.
 *
 * Plays once, on its own clock, when it scrolls into view — see `progress`
 * below. It is deliberately NOT a scroll-pinned section any more: the sequence
 * is unchanged, but it occupies one screen instead of charging four.
 */
export function SpiralGalaxy({
  words = DEFAULT_WORDS,
  targetChars = 300,
  centerWords = DEFAULT_CENTER_WORDS,
}: SpiralGalaxyProps) {
  // Spell the brand words around the spiral (separated by a middot).
  const text = words.join(' · ') + ' · '
  const ref = useRef<HTMLDivElement>(null)

  // Progress fraction after which the eye switches from rolling single words to
  // the finale (all three verbs at once).
  const FINALE_START = 0.82

  /* --- Time-driven, not scroll-pinned --------------------------------------
     This used to be a 400vh sticky section whose whole choreography was scrubbed
     by scrollYProgress — four screens of forced scrolling to deliver three
     words. It now plays ONCE, on its own clock, when the section comes into
     view, and occupies a single screen in normal flow.

     Every useTransform below is unchanged and simply reads this value instead of
     scrollYProgress, so the visual sequence is identical — it just no longer
     costs the reader four screens of scroll.

     It runs to 0.85, not 1: past 0.82 the finale has resolved, and the tail of
     `starOpacity` (0.85 → 1) was a fade-out for the card scrolling away. With
     the card now staying put, running to 1 would leave the finale sitting on an
     almost-black field. 0.85 lands exactly on the end of the plateau. */
  const progress = useMotionValue(0)
  const inView = useInView(ref, { once: true, amount: 0.55 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      progress.set(0.85) // honour the preference: show the resolved end state
      return
    }
    const controls = animate(progress, 0.85, { duration: 6.5, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, reducedMotion, progress])

  // Text spiral: zoom + rotate with scroll — but only up to the finale. The end
  // values are the ORIGINAL full-scroll motion (scale 5.5 / rotate -320 over the
  // whole section) sampled at FINALE_START, so the spin keeps its original speed and
  // then FREEZES the instant the three verbs resolve — the finale reads as a still
  // climax and the remaining scroll just unpins the card and scrolls the section up.
  const scale = useTransform(progress, [0, FINALE_START], [1.2, 4.73])
  const rotate = useTransform(progress, [0, FINALE_START], [0, -262])
  // Starfield co-rotates the SAME way (anticlockwise) but slower and linearly, so
  // the two layers read as one vortex with depth between them — not a flat, glued
  // lockstep, and not the jerky eased turn the starfield does on its own. (Counter-
  // rotating adds energy but fights the calm inward pull toward the center word.)
  const starRotate = useTransform(progress, [0, FINALE_START], [0, -115])
  // Spiral fades in at the start, then STAYS visible (no fade-out) — it freezes
  // behind the three words at the finale and rides up with the card as it scrolls
  // away, a richer backdrop than fading to black. NOTE: use the function form — a
  // 2-stop range starting at 0 doesn't clamp past its input here (it snaps back to
  // the start value, blanking the spiral), the same framer quirk as the clip-path.
  const textOpacity = useTransform(progress, (p) => Math.min(1, p / 0.06))
  // Starfield breathes in behind, dimmed so it reads as depth, not competition.
  const starOpacity = useTransform(progress, [0, 0.12, 0.85, 1], [0.1, 0.55, 0.55, 0.08])
  // Circular "portal" reveal: the card opens from a small circle over the eye and
  // blooms out to fill the whole rounded card — a quick beat at the very start,
  // then holds fully open for the rest of the section (incl. the 3-word finale).
  // NOTE: animate a numeric radius (numbers clamp past the input range; interpolating
  // the `circle()` string directly snaps back to the start value beyond 0.15, which
  // re-clipped the finale) and build the clip-path string from it.
  const clipRadius = useTransform(progress, [0, 0.15], [20, 85])
  const cardClip = useTransform(clipRadius, (r) => `circle(${r}% at 50% 50%)`)

  // Scroll-scrub the starfield's own animation so it's locked to the scroll like
  // the text spiral — scroll down advances it (forms + flies through), scroll up
  // reverses it. Mapped to a populated slice of its 0–1 timeline (skip the empty
  // seed phase). The starfield's internal camera rotation is anticlockwise too.
  const starTime = useRef(0.36)

  // The eye rolls through the three verbs once across the scroll, then hands off
  // to the finale — all three at once — for the last stretch.
  const [idx, setIdx] = useState(0)
  const [finale, setFinale] = useState(false)
  useMotionValueEvent(progress, 'change', (p) => {
    // Freeze the starfield scrub at the finale too, so nothing keeps moving.
    starTime.current = 0.36 + 0.54 * Math.min(p, FINALE_START)
    if (p >= FINALE_START) {
      setFinale(true)
    } else {
      setFinale(false)
      const k = centerWords.length
      setIdx(Math.min(k - 1, Math.floor((p / FINALE_START) * k)))
    }
  })

  const reps = Math.max(1, Math.ceil(targetChars / text.length))
  const chars = text.repeat(reps).split('')
  const n = chars.length

  return (
    <section ref={ref} className="relative bg-white">
      {/* Stage — one screen, in normal flow (it used to be a 400vh sticky pin).
          White with the same ambient gold + navy glows as the "Passe à l'action"
          section, so the portal blooms out of a soft warm/cool wash rather than
          flat paper. 88vh rather than a full screen so the next section peeks
          and the page still reads as scrollable. */}
      <div className="relative h-[88vh] min-h-[34rem] overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.07] blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-3xl"
        />
        {/* Rounded dark card — same 0.5rem inset + 2rem radius as the hero, so the
            spiral reads as a card floating on the paper background, not a full-bleed
            band. overflow-hidden clips the starfield + zooming spiral to the corners.

            #0a0a0f, not black: the site has exactly one dark surface value, shared
            by the hero, the page-header bands and the footer — this was the only
            true #000 left.

            This fill MUST match `ctx.fillStyle` in spiral-animation.tsx. The canvas
            repaints its own background every frame and is rendered rotated + scaled
            1.55, so the card only shows through at the corners the spun canvas
            misses. The two reading identically is what hides that seam; give them
            different values and you get coloured wedges at the corners. */}
        <motion.div
          style={{ clipPath: cardClip }}
          className="absolute inset-2 flex items-center justify-center overflow-hidden rounded-[2rem] bg-[#0a0a0f]"
        >
        {/* Layer 1 — 3D starfield: scroll-scrubbed depth, co-rotating with the
            word spiral (same anticlockwise direction, slower → parallax depth) */}
        <motion.div style={{ opacity: starOpacity }} className="absolute inset-0">
          <motion.div style={{ rotate: starRotate, scale: 1.55 }} className="absolute inset-0">
            <SpiralAnimation progress={starTime} />
          </motion.div>
        </motion.div>

        {/* Navy bloom — the hero's wash (same geometry, from the top), which is how
            every other dark surface on the site carries brand colour.

            It sits ABOVE the canvas, not behind it: the canvas is opaque and
            repaints itself each frame, so a bloom on the card would be hidden
            except at the rotated corners — i.e. it would BE the seam. Kept low
            (0.22 vs the hero's 0.26) because here it passes over the starfield,
            and the stars are faint to begin with. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-12%,rgba(18,36,107,0.22)_0%,transparent_58%)]"
        />

        {/* Layer 2 — text spiral, zooming in front */}
        <motion.div
          style={{ scale, rotate, opacity: textOpacity }}
          className="relative z-[1] h-full w-full font-mono text-[20px] text-[#c3d0ff] will-change-transform [transform-origin:50%_50%]"
        >
          {chars.map((ch, i) => {
            const radiusVh = 10 - (7 * i) / n
            const translateY = -2.9 * radiusVh
            const rotation = (1080 * i) / n
            const s = 0.4 - (0.25 * i) / n
            const charOpacity = 0.4 + 0.6 * (1 - i / n)
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 whitespace-pre [transform-origin:0_0]"
                style={{
                  transform: `rotate(${rotation}deg) translateY(${translateY}vh) scale(${s})`,
                  opacity: charOpacity,
                }}
              >
                {ch === ' ' ? '⠀' : ch}
              </span>
            )
          })}
        </motion.div>

        {/* Layer 3 — the eye: each verb rolls up into view as you scroll (Imagine →
            Build → Transform), then they resolve into all three together (font-display
            gold, same display face as the hero title). */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          {finale ? (
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center whitespace-nowrap px-4 font-display text-[clamp(1.05rem,4.8vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight text-gold drop-shadow-[0_4px_34px_rgba(0,0,0,0.85)]"
            >
              {centerWords.map((w, i) => {
                // Alternate solid / outline (like the Motion example), starting solid.
                const outline = i % 2 === 1
                return (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="whitespace-nowrap"
                  >
                    <span className={outline ? 'italic text-transparent [-webkit-text-stroke:0.045em_var(--color-gold)]' : undefined}>
                      {w}
                    </span>
                    {i < centerWords.length - 1 && (
                      <span className="mx-[0.3em] font-normal text-gold/40">·</span>
                    )}
                  </motion.span>
                )
              })}
            </motion.div>
          ) : (
            <div className="relative flex h-[1.25em] w-full items-center justify-center overflow-hidden font-display text-[clamp(2rem,7vw,5rem)] font-extrabold uppercase leading-none tracking-tight text-gold">
              <AnimatePresence initial={false}>
                <motion.span
                  key={centerWords[idx]}
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-115%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap drop-shadow-[0_4px_34px_rgba(0,0,0,0.85)]"
                >
                  {centerWords[idx]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* inner hairline ring — matches the hero card's inset edge */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
        </motion.div>
      </div>
    </section>
  )
}
