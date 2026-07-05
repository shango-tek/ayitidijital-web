'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * CosmicBackground — takes the original cosmic still as its background, untouched,
 * and animates ONLY the light-streaks (comet-rain) baked into it.
 *
 *  - the image is the real background (stars, nebula blooms, corner brackets and
 *    lens-flares stay the source pixels — nothing is redrawn);
 *  - a transparent <canvas> masks a narrow central corridor (to hide the frozen
 *    streaks) and rains comets down the SAME vertical columns as the original
 *    lines, mapped through the image's `cover` crop so they line up at any size.
 *
 * Drop the picture at /public/cosmic-bg.jpg (or pass another `src`).
 */

/** Native aspect of the source image (1920 × 1080 = 16:9). */
const IMG_ASPECT = 16 / 9

/** x-columns of the existing streaks, as fractions of the source image width. */
const TRACKS = [0.451, 0.49, 0.499, 0.513, 0.52, 0.543]

/** near-black matching the image's corridor, so the thin per-column masks vanish. */
const MASK_RGB = '0,2,6'

export interface CosmicBackgroundProps {
  src?: string
  className?: string
  children?: ReactNode
}

interface Comet {
  track: number
  x: number
  y: number
  len: number
  sp: number
  w: number
  a: number
}

export function CosmicBackground({ src = '/cosmic-bg.jpg', className, children }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    let W = 0
    let H = 0
    let imgLeft = 0
    let imgW = 0
    let comets: Comet[] = []
    let raf = 0

    const mapX = (fx: number) => imgLeft + fx * imgW

    const spawn = (track: number, seeded: boolean): Comet => ({
      track,
      x: mapX(track) + rand(-0.6, 0.6),
      y: seeded ? rand(-H, H) : rand(-H * 0.55, -30),
      len: rand(55, 250),
      sp: reduce ? rand(0.5, 1) : rand(3, 9.5),
      w: rand(0.85, 2.1),
      a: rand(0.5, 1),
    })

    const build = () => {
      const DPR = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      W = r.width
      H = r.height
      if (!W || !H) return
      canvas.width = Math.round(W * DPR)
      canvas.height = Math.round(H * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      imgW = Math.max(W, H * IMG_ASPECT)
      imgLeft = (W - imgW) / 2

      const per = reduce ? 1 : 3
      comets = []
      for (const track of TRACKS) {
        for (let i = 0; i < per; i++) comets.push(spawn(track, true))
      }
    }

    // a thin, soft dark strip on each column only — hides the frozen streak there
    // without blacking out the whole centre (which would read as a dark band)
    const drawMask = () => {
      const halfW = Math.max(11, imgW * 0.0075)
      for (const track of TRACKS) {
        const x = mapX(track)
        const g = ctx.createLinearGradient(x - halfW, 0, x + halfW, 0)
        g.addColorStop(0, `rgba(${MASK_RGB},0)`)
        g.addColorStop(0.5, `rgba(${MASK_RGB},0.9)`)
        g.addColorStop(1, `rgba(${MASK_RGB},0)`)
        ctx.fillStyle = g
        ctx.fillRect(x - halfW, 0, halfW * 2, H)
      }
    }

    const drawComet = (cm: Comet) => {
      const { x, y } = cm
      const tailY = y - cm.len
      const g = ctx.createLinearGradient(x, tailY, x, y)
      g.addColorStop(0, 'rgba(206,224,255,0)')
      g.addColorStop(0.72, `rgba(212,229,255,${cm.a * 0.22})`)
      g.addColorStop(1, `rgba(241,247,255,${cm.a * 0.92})`)
      ctx.strokeStyle = g
      ctx.lineWidth = cm.w
      ctx.beginPath()
      ctx.moveTo(x, tailY)
      ctx.lineTo(x, y)
      ctx.stroke()

      const hr = cm.w * 4 + 3
      const hg = ctx.createRadialGradient(x, y, 0, x, y, hr)
      hg.addColorStop(0, `rgba(245,250,255,${cm.a})`)
      hg.addColorStop(0.5, `rgba(198,222,255,${cm.a * 0.4})`)
      hg.addColorStop(1, 'rgba(198,222,255,0)')
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(x, y, hr, 0, 6.2832)
      ctx.fill()
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      drawMask()
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (const cm of comets) {
        cm.y += cm.sp
        if (cm.y - cm.len > H) Object.assign(cm, spawn(cm.track, false))
        drawComet(cm)
      }
      ctx.restore()
      raf = requestAnimationFrame(frame)
    }

    build()
    frame()
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [src])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        backgroundColor: `rgb(${MASK_RGB})`,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      {children}
    </div>
  )
}
