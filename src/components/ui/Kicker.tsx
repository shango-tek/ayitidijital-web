export interface KickerProps {
  label: string
  /** Third pixel in flag red (used on light sections) */
  red?: boolean
  className?: string
}

/** Section eyebrow: three tilted pixels + uppercase label. Adapts on dark surfaces via `.on-dark` parent. */
export function Kicker({ label, red, className }: KickerProps) {
  return (
    <p className={className ? `kicker ${className}` : 'kicker'}>
      <span className="px" />
      <span className="px" />
      <span className={red ? 'px px-red' : 'px'} />
      <span className="txt">{label}</span>
    </p>
  )
}
