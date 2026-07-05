export interface PricingFeature {
  label: string
  /** false = shown greyed-out (not included in this tier). Defaults to true. */
  available?: boolean
}

export interface PricingCardProps {
  /** Tier name shown as the mono kicker, e.g. "STARTER". */
  name: string
  description: string
  /** Big headline amount, e.g. "$99" (pre-formatted). */
  price: string
  currency?: string
  period?: string
  cta: { label: string; href: string }
  featuresTitle?: string
  features: PricingFeature[]
  /** Emphasised variant (raised, brand-tinted border). */
  featured?: boolean
}

const PlusIcon = () => (
  <svg className="pc-plus" viewBox="0 0 15 15" aria-hidden="true">
    <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
  </svg>
)

/**
 * Radiant-style pricing / tier card: mono kicker, lead, big price, pill CTA and
 * a plus-marked feature list (greyed rows for features not in the tier).
 * Fully parameterised for reuse (membership tiers, program cards, etc.).
 */
export function PricingCard({
  name,
  description,
  price,
  currency = 'USD',
  period = 'per month',
  cta,
  featuresTitle = 'Included:',
  features,
  featured = false,
}: PricingCardProps) {
  return (
    <div className={`pc${featured ? ' pc-featured' : ''}`}>
      <p className="pc-kicker">{name}</p>
      <p className="pc-desc">{description}</p>

      <div className="pc-price">
        <span className="pc-amount">{price}</span>
        <span className="pc-unit">
          {currency}
          <br />
          {period}
        </span>
      </div>

      <a className="pc-cta" href={cta.href}>
        {cta.label}
      </a>

      <p className="pc-feat-title">{featuresTitle}</p>
      <ul className="pc-feats">
        {features.map((f, i) => (
          <li key={i} className={f.available === false ? 'is-off' : undefined}>
            <PlusIcon />
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
