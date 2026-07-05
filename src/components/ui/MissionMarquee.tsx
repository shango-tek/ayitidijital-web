const DEFAULT_WORDS = [
  'AYITI DIJITAL',
  'DEMOKRATIZE',
  'DIJITALIZE',
  'TRANSFÒME',
  'KONEKTE',
  'INOVASYON',
  'TALAN',
  'ENPAK',
]

export interface MissionMarqueeProps {
  /** Mission words to scroll. */
  words?: string[]
}

/**
 * Full-bleed infinite word marquee — outlined display words separated by a
 * sparkle, duplicated once for a seamless -50% loop. Pauses on hover.
 * Ported from the Ayiti Dijital (Angular) footer marquee.
 */
export function MissionMarquee({ words = DEFAULT_WORDS }: MissionMarqueeProps) {
  const loop = [...words, ...words]
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {loop.map((word, i) => (
          <span className="mq-item" key={i}>
            <span className="mq-word">{word}</span>
            <svg className="mq-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c0 5.523-4.477 10-10 10 5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
