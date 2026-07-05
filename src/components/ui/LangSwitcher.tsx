import { Fragment } from 'react'

export interface LangOption {
  code: string
  label: string
  /** BCP-47 tag for the lang attribute, e.g. 'ht', 'fr', 'en' */
  lang: string
  href?: string
  /** Full language name shown in the dropdown, e.g. 'Kreyòl' */
  name?: string
}

export interface LangSwitcherProps {
  options: LangOption[]
  current: string
  ariaLabel?: string
}

/** KR | FR | EN language switcher. */
export function LangSwitcher({ options, current, ariaLabel = 'Chwazi lang ou' }: LangSwitcherProps) {
  return (
    <div className="lang" aria-label={ariaLabel}>
      {options.map((opt, i) => (
        <Fragment key={opt.code}>
          {i > 0 && (
            <span className="sep" aria-hidden="true">
              |
            </span>
          )}
          <a href={opt.href ?? '#'} lang={opt.lang} aria-current={opt.code === current ? 'true' : undefined}>
            {opt.label}
          </a>
        </Fragment>
      ))}
    </div>
  )
}
