'use client'

interface ScrollToTopProps {
  label: string
}

/**
 * Vertical "back to top" affordance — an up-arrow sticker over a rotated label,
 * modelled on the reference footer button. Smooth-scrolls the page to the top.
 */
export function ScrollToTop({ label }: ScrollToTopProps) {
  return (
    <button
      type="button"
      className="kf-scrolltop"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className="kf-scrolltop-arrow" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M21.707 4.293L37.5 20 21.707 35.707l-1.414-1.414L33.584 21H6v-2h27.585L20.293 5.707z"
          />
        </svg>
      </span>
      <span className="kf-scrolltop-text">{label}</span>
    </button>
  )
}
