'use client'

import { useEffect, useRef } from 'react'

/**
 * Massive faded wordmark that scales to the footer width, glyph edges flush
 * against the container. Measures the rendered text and refits the SVG viewBox
 * once fonts are ready and on resize. Sits below the radiant footer.
 */
export function FooterWatermark({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const fit = () => {
      const svg = svgRef.current
      const t = textRef.current
      if (!svg || !t) return
      try {
        const b = t.getBBox()
        svg.setAttribute('viewBox', `${b.x} ${b.y} ${b.width} ${b.height}`)
      } catch {
        /* getBBox can throw if not yet rendered — ignore. */
      }
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit)
    else fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="kf-watermark" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="62 95 876 175"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text ref={textRef} x="500" y="240" textAnchor="middle" fontSize="320">
          {text}
        </text>
      </svg>
    </div>
  )
}
