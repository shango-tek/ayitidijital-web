'use client'

import {Fragment, useEffect, useRef} from 'react'
import {RadiantNavbar} from '../layout/RadiantNavbar'
import {ScrollIndicator} from '../ui/ScrollIndicator'
import type {LangOption, NavLink} from '@/content/types'
import type {HeroTitlePart, SiteContent} from '@/content/site'

/* -----------------------------------------------------------------------------
 * PIXEL CANVAS — staggered outward ripple
 * -------------------------------------------------------------------------- */

interface Pixel {
    x: number
    y: number
    color: string
    speed: number
    size: number
    sizeStep: number
    minSize: number
    maxSizeInt: number
    maxSize: number
    delay: number
    counter: number
    counterStep: number
    isIdle: boolean
    isReverse: boolean
    isShimmer: boolean
    draw: (ctx: CanvasRenderingContext2D) => void
    appear: (ctx: CanvasRenderingContext2D) => void
    disappear: (ctx: CanvasRenderingContext2D) => void
    shimmer: () => void
}

function createPixel(
    canvasWidth: number,
    canvasHeight: number,
    x: number,
    y: number,
    color: string,
    baseSpeed: number,
    delay: number
): Pixel {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const maxSizeInt = 2
    const maxSize = rand(0.5, 2)
    const minSize = 0.5

    const p: Pixel = {
        x, y, color,
        speed: rand(0.08, 0.4) * baseSpeed,
        size: 0,
        sizeStep: rand(0.12, 0.28),
        minSize,
        maxSizeInt,
        maxSize,
        delay,
        counter: 0,
        counterStep: rand(1.8, 3.2) + (canvasWidth + canvasHeight) * 0.008,
        isIdle: false,
        isReverse: false,
        isShimmer: false,
        draw(ctx) {
            const offset = p.maxSizeInt * 0.5 - p.size * 0.5
            ctx.fillStyle = p.color
            ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size)
        },
        appear(ctx) {
            p.isIdle = false
            if (p.counter <= p.delay) {
                p.counter += p.counterStep
                return
            }
            if (p.size >= p.maxSize) p.isShimmer = true
            if (p.isShimmer) p.shimmer()
            else p.size += p.sizeStep
            p.draw(ctx)
        },
        disappear(ctx) {
            p.isShimmer = false
            p.counter = 0
            if (p.size <= 0) {
                p.isIdle = true
                return
            }
            p.size -= 0.1
            p.draw(ctx)
        },
        shimmer() {
            if (p.size >= p.maxSize) p.isReverse = true
            else if (p.size <= p.minSize) p.isReverse = false
            if (p.isReverse) p.size -= p.speed
            else p.size += p.speed
        },
    }
    return p
}

/** Each headline part keeps its own face, whichever line it lands on. */
const HERO_PART_CLASS: Record<HeroTitlePart, string> = {
    tomorrow: 'font-sans font-extrabold tracking-tighter',
    with: 'font-display font-medium',
    vision: 'font-serif italic font-semibold',
    and: 'font-display font-medium',
    action: 'font-serif italic font-semibold',
}


export interface SilentPrecisionHeroProps {
    brandName: string
    links: NavLink[]
    langs: LangOption[]
    banner?: { label: string; href: string }
    supportLabel?: string
    /* Sourced from the content types rather than restated here. The shape was
       duplicated and the copies drifted the moment one gained a field. */
    title: SiteContent['heroTitle']
}

export function SilentPrecisionHero({
                                        brandName = 'Ayiti Dijital',
                                        links = [],
                                        langs = [],
                                        banner,
                                        supportLabel,
                                        title,
                                    }: SilentPrecisionHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapRef = useRef<HTMLDivElement>(null)
    const shapeRef = useRef<HTMLSpanElement>(null)
    const restRef = useRef<HTMLSpanElement>(null)

    /* Phone headline: set the vertical word to exactly the height of the
       horizontal block beside it.
       A vertical word's run is its ordinary text width, so the two are related
       by a single ratio — but not a ratio I can hardcode, because the words
       differ per locale ("Façonner" / "Fasonnen" / "Shaping") and so do the
       tails, which changes how many lines the block wraps to. So it is
       measured: read both boxes, scale the word by their ratio. The
       relationship is linear, so one pass lands it exactly.
       Above phone width the layout is the original two centred rows and the
       inline size is cleared, letting the stylesheet's clamp take back over.
       The query must stay in step with the one in globals.css. */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 699px)')

        const fit = () => {
            const shape = shapeRef.current
            const rest = restRef.current
            if (!shape || !rest) return
            if (!mq.matches) {
                shape.style.fontSize = ''
                return
            }
            shape.style.fontSize = ''
            const target = rest.getBoundingClientRect().height
            const natural = shape.getBoundingClientRect().height
            if (!target || !natural) return
            const current = parseFloat(getComputedStyle(shape).fontSize)
            shape.style.fontSize = `${current * (target / natural)}px`
        }

        fit()
        // Fonts land after first paint; a webfont swap changes both boxes.
        document.fonts?.ready.then(fit).catch(() => {})
        window.addEventListener('resize', fit)
        mq.addEventListener('change', fit)
        return () => {
            window.removeEventListener('resize', fit)
            mq.removeEventListener('change', fit)
        }
    }, [title])

    useEffect(() => {
        const canvas = canvasRef.current
        const wrap = wrapRef.current
        if (!canvas || !wrap) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let pixels: Pixel[] = []
        let animationId: number
        let lastFrame = performance.now()
        const frameInterval = 1000 / 60

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const colors = ['rgba(138,138,150,0.55)', 'rgba(138,138,150,0.55)', 'rgba(138,138,150,0.55)', 'rgba(138,138,150,0.55)', 'rgba(232,232,236,0.85)']
        const gap = 6
        const speed = 30

        const init = () => {
            const rect = wrap.getBoundingClientRect()
            const w = Math.floor(rect.width)
            const h = Math.floor(rect.height)
            canvas.width = w
            canvas.height = h
            canvas.style.width = w + 'px'
            canvas.style.height = h + 'px'

            const effectiveSpeed = reducedMotion ? 0 : Math.min(speed, 100) * 0.001
            pixels = []

            for (let x = 0; x < w; x += gap) {
                for (let y = 0; y < h; y += gap) {
                    const color = colors[Math.floor(Math.random() * colors.length)]
                    const dx = x - w / 2
                    const dy = y - h / 2
                    const delay = reducedMotion ? 0 : Math.sqrt(dx * dx + dy * dy) * 0.65
                    pixels.push(createPixel(w, h, x, y, color, effectiveSpeed, delay))
                }
            }
        }

        const loop = (now: number) => {
            animationId = requestAnimationFrame(loop)
            const elapsed = now - lastFrame
            if (elapsed < frameInterval) return
            lastFrame = now - (elapsed % frameInterval)

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const pixel of pixels) {
                pixel.appear(ctx)
            }
        }

        init()
        const ro = new ResizeObserver(() => init())
        ro.observe(wrap)

        animationId = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(animationId)
            ro.disconnect()
        }
    }, [])

    return (
        <section className="precision-hero">
            <div className="precision-hero-bg precision-grain"/>
            <div className="precision-hero-inner">
                <RadiantNavbar
                    brandName={brandName}
                    links={links}
                    langs={langs}
                    supportLabel={supportLabel}
                    banner={undefined}
                />

                {/* Ambient orbs */}
                <div className="precision-orb w-[40rem] h-[40rem] -top-40 -left-40"
                     style={{background: 'radial-gradient(circle, var(--lanbi-blue-ondark) 0%, transparent 70%)'}}></div>
                <div className="precision-orb w-[36rem] h-[36rem] -bottom-40 -right-32"
                     style={{
                         background: 'radial-gradient(circle, var(--color-periwinkle) 0%, transparent 70%)',
                         opacity: 0.25
                     }}></div>

                {/* Pixel canvas background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-[2rem]">
                        <canvas ref={canvasRef} className="block w-full h-full"></canvas>
                    </div>
                    <div
                        className="absolute inset-0 precision-vignette pointer-events-none opacity-85 rounded-[2rem]"></div>
                </div>

                <div className="precision-hero-content">

                    {/* Tahoe glass header */}
                    <div
                        className="relative z-10 flex flex-col items-center justify-center text-center order-2 md:order-2 pointer-events-none w-full">
                        {/* Flat-ish structure so one markup serves both layouts (see
                            `.hero-title` in globals.css):
                              - phone: "Façonner" set vertically, running the full
                                height of the horizontal block beside it
                              - everywhere else: the original two centred rows, with
                                `.hero-rest` collapsing via `display:contents` so its
                                children become direct flex items of the h1 again */}
                        <h1 className="tahoe-glass-text hero-title px-1 w-full text-[clamp(1.35rem,6.5vw,3rem)] sm:text-5xl md:text-7xl lg:text-[clamp(4.25rem,7vw,7.25rem)] leading-[1.08]">
                            <span ref={shapeRef} className="hero-shape font-display italic font-medium">{title.shaping}</span>
                            <span ref={restRef} className="hero-rest">
                                {/* Lines come from content (`phoneLines`) because where they
                                    break is a per-language call. Each part keeps its own face:
                                    the sans for the noun, serif italic for the two accents,
                                    and the connectives upright in the display face — the
                                    italics here belong to the display word and the accents,
                                    not to "with" and "&". */}
                                {title.phoneLines.map((line, i) => (
                                    <Fragment key={i}>
                                        {/* zero-height full-basis item: on desktop it forces the
                                            wrap the old second <div> used to make, so everything
                                            after the first line shares one row. display:none on
                                            phone, where each line already stands alone. */}
                                        {i === 1 && <span className="hero-break" aria-hidden="true" />}
                                        <span className="hero-line">
                                            {line.map((part) => {
                                                const phoneWord = title.phone?.[part]
                                                return (
                                                    <span key={part} className={HERO_PART_CLASS[part]}>
                                                        {phoneWord ? (
                                                            /* Both spellings ship; the media query shows
                                                               one. `display:none` keeps the hidden one out
                                                               of the a11y tree too, so the h1 reads as the
                                                               one word that is actually on screen. */
                                                            <>
                                                                <span className="hero-word-phone">{phoneWord}</span>
                                                                <span className="hero-word-wide">{title[part]}</span>
                                                            </>
                                                        ) : (
                                                            title[part]
                                                        )}
                                                    </span>
                                                )
                                            })}
                                        </span>
                                    </Fragment>
                                ))}
                            </span>
                        </h1>
                    </div>

                </div>

                <ScrollIndicator href="#apropo"/>

            </div>
        </section>
    )
}
