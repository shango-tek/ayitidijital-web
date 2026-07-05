export type LanbiTone = 'sand' | 'navy'

const TONE_COLOR: Record<LanbiTone, string> = {
  sand: '#F4EFE6',
  navy: '#12246B',
}

export interface LanbiLogoProps {
  /** 'sand' for dark surfaces (nav, footer), 'navy' for light surfaces */
  tone?: LanbiTone
  size?: number | string
  className?: string
}

/** The Ayiti Dijital mark: lanbi spiral dissolving into a pixel trail, one red pixel (the call). */
export function LanbiLogo({ tone = 'sand', size = 42, className }: LanbiLogoProps) {
  const c = TONE_COLOR[tone]
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g fill="none" stroke={c} strokeLinecap="round">
        <path d="M247 197 A65 65 0 0 0 247 327" strokeWidth="54" />
        <path d="M247 327 A125 125 0 0 0 247 77" strokeWidth="42" />
        <path d="M247 77 A181 181 0 1 0 337.5 414.7" strokeWidth="32" />
      </g>
      <g>
        <rect x="359.8" y="366.2" width="42" height="42" rx="7" fill={c} transform="rotate(-46 380.8 387.2)" />
        <rect x="402.4" y="320.6" width="37" height="37" rx="6" fill={c} transform="rotate(25 420.9 339.1)" />
        <rect x="429.4" y="252.4" width="32" height="32" rx="6" fill={c} transform="rotate(3 445.4 268.4)" />
        <rect x="424.4" y="166.6" width="28" height="28" rx="5" fill={c} transform="rotate(-22 438.4 180.6)" />
        <rect x="372.4" y="80.2" width="26" height="26" rx="5" fill="#D21034" transform="rotate(-50 385.4 93.2)" />
      </g>
    </svg>
  )
}
