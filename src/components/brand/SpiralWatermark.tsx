export interface SpiralWatermarkProps {
  /** Single flat color for the whole watermark */
  color?: string
  className?: string
}

/** Monochrome lanbi spiral used as a large decorative watermark (e.g. dark CTA bands). */
export function SpiralWatermark({ color = '#1D3383', className }: SpiralWatermarkProps) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M247 197 A65 65 0 0 0 247 327" strokeWidth="54" />
        <path d="M247 327 A125 125 0 0 0 247 77" strokeWidth="42" />
        <path d="M247 77 A181 181 0 1 0 337.5 414.7" strokeWidth="32" />
      </g>
      <g fill={color}>
        <rect x="359.8" y="366.2" width="42" height="42" rx="7" transform="rotate(-46 380.8 387.2)" />
        <rect x="402.4" y="320.6" width="37" height="37" rx="6" transform="rotate(25 420.9 339.1)" />
        <rect x="429.4" y="252.4" width="32" height="32" rx="6" transform="rotate(3 445.4 268.4)" />
        <rect x="424.4" y="166.6" width="28" height="28" rx="5" transform="rotate(-22 438.4 180.6)" />
        <rect x="372.4" y="80.2" width="26" height="26" rx="5" transform="rotate(-50 385.4 93.2)" />
      </g>
    </svg>
  )
}
