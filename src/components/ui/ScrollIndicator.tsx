interface ScrollIndicatorProps {
  href?: string
  label?: string
}

/**
 * A sticky/absolute scroll indicator with a looping background animation.
 * Ported from legacy Ayiti Dijital styles.
 */
export function ScrollIndicator({
  href = "#main",
  label = "Scroll to content"
}: ScrollIndicatorProps) {
  return (
    <div className="video-scroll-indicator-wrapper">
      <a 
        className="video-scroll-indicator" 
        href={href} 
        data-js-scroll-to=""
      >
        <span className="sr-only">{label}</span>
      </a>
    </div>
  )
}
