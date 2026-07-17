import type { CSSProperties } from 'react'

export interface PageHeaderProps {
  /** Eyebrow that names the page, e.g. "À propos". Optional. */
  label?: string
  /** First word of the heading, rendered as an italic outlined (stroked) word. */
  strokeWord: string
  /** The remainder of the heading, rendered solid white. */
  titleRest: string
  /** Optional supporting sentence under the heading. */
  subtitle?: string
  /**
   * Background photo, frosted behind the heading. Heavily blurred, so a small
   * image is fine. MUST be a local asset under /public — never a remote URL:
   * the header renders eagerly, so a third-party host would receive every
   * visitor's IP before they interact with anything. Omit it for a clean dark
   * band (what the statutory pages use).
   */
  image?: string
}

/** Outlined-text look for the first heading word (no Tailwind utility for this). */
const strokeStyle: CSSProperties = {
  WebkitTextStroke: '1.25px rgba(255,255,255,0.92)',
  color: 'transparent',
}

/**
 * Reusable, card-less page header band. A frosted background photo shows through
 * a heavy blur, a left→right dark gradient keeps the heading legible, a faint
 * brand palm watermark sits on the right, and the content is bottom-aligned so
 * every page's header shares the same baseline and height. The site navbar
 * overlays the top of this band (see `.site-header` in globals.css), matching
 * the home hero — hence the tall `pt-32`.
 */
export function PageHeader({
  label = '',
  strokeWord,
  titleRest,
  subtitle = '',
  image,
}: PageHeaderProps) {
  return (
    <section className="page-header relative isolate flex overflow-hidden bg-[#0a0a0f] min-h-[26rem] lg:min-h-[34rem] pt-32 pb-14 lg:pb-20">
      {/* Frosted background photo (kept visible — the glass blur shows). Omitted
          entirely when no image is passed, leaving the gradients + watermark. */}
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover blur-md"
        />
      ) : null}

      {/* Legibility + blue: near-black behind the heading (left) blends through
          navy, then reveals the frosted photo on the right */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0a0a0f_0%,#0a0a0f_20%,rgba(18,36,107,0.9)_46%,rgba(18,36,107,0.4)_68%,transparent_100%)]" />

      {/* Blend: darker near-black under the nav (top) and into the next section (bottom) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,10,15,0.7),transparent_32%,transparent_70%,rgba(10,10,15,0.6))]" />

      {/* Faint indigo glow — echoes the hero's ambient orbs, keeps the blue alive */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_85%_at_16%_-10%,rgba(99,102,241,0.18),transparent_60%)]" />

      {/* Faint brand palm watermark on the right */}
      <svg
        className="pointer-events-none absolute -z-10 top-1/2 right-2 lg:right-24 h-[135%] w-auto -translate-y-1/2 text-white/[0.04]"
        viewBox="0 0 825 1123"
        fill="currentColor"
        aria-hidden="true"
      >
        <g transform="translate(-4079 -756)">
          <path
            transform="matrix(1 0 0 1.00014 4080.12 759)"
            fillRule="nonzero"
            d="M820.759 256.731C805.505 231.839 743.787 192.314 695.241 176.034 646.745 159.766 597.231 155.066 546.215 162.331 597.519 129.282 653.202 108.148 717.331 94.9708 666.649 77.0359 619.34 70.8097 570.511 79.4726 521.009 88.2637 478.907 111.457 441.408 150.526 445.749 88.7895 421.543 42.3204 380.608 0.00641218 380.39 0.519386 380.191 1.0516 379.986 1.57098 379.665 1.10931 379.357 0.628393 379.037 0.166716 347.527 49.8932 333.235 100.299 349.99 159.881 305.348 129.218 259.424 115.028 209.172 116.445 159.599 117.843 114.528 133.521 68.527 161.356 134.002 161.266 192.808 170.686 249.742 192.667 198.303 195.879 150.77 210.512 106.577 236.263 62.3328 262.034 9.894 313.235 0 340.705 63.2369 307.252 139.689 289.35 192.866 281.95 204.651 280.283 215.283 279.161 224.381 278.481 195.245 295.166 169.73 313.896 148.391 335.139 103.14 380.108 76.6833 436.336 74.4454 508.108 126.698 455.008 189.486 419.126 254.955 385.994 221.951 453.854 214.705 524.093 258.372 599.52 269.799 525.914 298.34 459.484 339.499 395.407 339.198 414.81 342.449 449.949 344.328 450.917 361.756 428.295 379.184 405.699 397.023 382.576 399.479 379.383 401.999 376.254 404.583 373.17 422.018 620.5 405.327 868.286 354.914 1110.02L352.875 1119.8 467.935 1119.8 468.493 1112.28C487.21 861.073 471.52 609.215 421.883 363.436 428.263 368.085 434.451 372.984 440.44 378.133 462.594 397.164 484.242 415.766 505.889 434.387 507.531 433.059 503.6 398.004 499.374 379.069 499.393 379.101 499.413 379.101 499.426 379.114 552.692 433.508 594.063 492.776 620.148 562.502 647.637 479.798 626.323 412.502 580.258 352.728 651.086 371.9 719.831 394.33 781.76 435.74 765.031 365.911 727.757 316.217 674.337 281.347 649.131 264.849 620.34 251.685 588.427 241.239 597.474 240.053 608.112 239.001 619.987 238.251 673.561 234.731 752.059 236.776 820.759 256.731"
          />
        </g>
      </svg>

      {/* Content, bottom-aligned so every page header shares the same baseline & height */}
      <div className="relative mt-auto w-full mx-auto max-w-[90rem] px-5 md:px-10">
        

        <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.06] tracking-tight max-w-3xl">
          <span className="italic" style={strokeStyle}>
            {strokeWord}&nbsp;
          </span>
          {titleRest}
        </h1>

        {subtitle ? (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{subtitle}</p>
        ) : null}
      </div>
    </section>
  )
}
