export interface BrandGradientProps {
  className?: string
}

/**
 * Radiant-style soft gradient panel background, retinted to the espiral brand
 * (sand → sky → periwinkle). Pastel throughout so navy text stays readable.
 */
export function BrandGradient({ className }: BrandGradientProps) {
  return <div aria-hidden="true" className={className ? `brand-gradient ${className}` : 'brand-gradient'} />
}
