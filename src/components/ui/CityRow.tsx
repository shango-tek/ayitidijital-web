import { Fragment } from 'react'
import { PixelSep } from './PixelSep'

export interface CityRowProps {
  cities: string[]
  className?: string
}

/** Uppercase city list separated by pixel dots (diaspora network row). */
export function CityRow({ cities, className = 'city-row' }: CityRowProps) {
  return (
    <p className={className}>
      {cities.map((city, i) => (
        <Fragment key={city}>
          {i > 0 && <PixelSep />}
          {city}
        </Fragment>
      ))}
    </p>
  )
}
