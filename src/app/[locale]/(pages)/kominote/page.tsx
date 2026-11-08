import { RoutePage } from '@/components/pages/RoutePage'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

const GITHUB = 'https://github.com/shango-tek/ayitidijital-web'
const MAIL = 'contact@ayitidijital.org'

const T = {
  ht: {
    title: 'Kominote',
    sub: 'Konekte ak kolabore — kèlkeswa kote ou ye.',
    waysTitle: 'Fason pou w antre nan konbit la',
    ways: [
      ['Kontribye nan kòd la', 'Premye pull request ou, se men ou nan konbit la. Kòde, korije, dokimante oswa tradui.', 'Wè kòd la sou GitHub', GITHUB, true],
      ['Vin manm', 'Antre nan asosyasyon an epi ede nou bati byen piblik dijital pou Ayiti.', 'Ekri nou', `mailto:${MAIL}`, false],
      ['Konekte ekosistèm nan', 'Ou se yon òganizasyon, yon inivèsite oswa yon patnè teknik ? Ann pale.', 'Kontakte nou', `mailto:${MAIL}`, false],
    ],
    citiesLabel: 'Yon konbit san fwontyè',
  },
  fr: {
    title: 'Communauté',
    sub: 'Se connecter et collaborer — où que tu sois.',
    waysTitle: 'Rejoindre le konbit',
    ways: [
      ['Contribuer au code', 'Ta première pull request, c’est ta main dans le konbit. Coder, corriger, documenter ou traduire.', 'Voir le code sur GitHub', GITHUB, true],
      ['Devenir membre', 'Rejoins l’association et aide-nous à bâtir des biens publics numériques pour Haïti.', 'Écris-nous', `mailto:${MAIL}`, false],
      ['Connecter l’écosystème', 'Tu es une organisation, une université ou un partenaire technique ? Parlons-en.', 'Nous contacter', `mailto:${MAIL}`, false],
    ],
    citiesLabel: 'Un konbit sans frontières',
  },
  en: {
    title: 'Community',
    sub: 'Connect and collaborate — from anywhere.',
    waysTitle: 'Join the konbit',
    ways: [
      ['Contribute code', 'Your first pull request is your hand in the konbit. Code, fix, document or translate.', 'See the code on GitHub', GITHUB, true],
      ['Become a member', 'Join the association and help us build digital public goods for Haiti.', 'Write to us', `mailto:${MAIL}`, false],
      ['Connect the ecosystem', 'An organisation, a university, or a technical partner? Let’s talk.', 'Contact us', `mailto:${MAIL}`, false],
    ],
    citiesLabel: 'A konbit without borders',
  },
} as const

/**
 * "Kominote" — the Connect / Konekte pillar's home, in the UnternehmerTUM
 * register: how to contribute code, join the association, and connect the
 * ecosystem. All CTAs are real (the public repo, the association's address).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/kominote', locale, T[toLocale(locale)].title)
}

export default async function KominotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = toLocale(localeParam)
  const content = getSiteContent(locale)
  const t = T[locale]

  return (
    <RoutePage
      content={content}
      path="/kominote"
      title={content.pageTitles.community}
      subtitle={t.sub}
      image="/headers/nouvel.webp"
    >
      <div className="page-wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          {/* Left rail — the diaspora framing + cities */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-tum text-xl font-extrabold leading-snug text-tum-ink lg:text-2xl">
              {content.diaspora.title}
            </p>
            <p className="mt-3 font-tum leading-relaxed text-tum-muted">{content.diaspora.lead}</p>
            <p className="mt-8 font-tum text-[11px] font-bold uppercase tracking-[0.16em] text-tum-muted">
              {t.citiesLabel}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-tum text-xs font-semibold text-electric">
              {content.diaspora.cities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </p>
          </div>

          {/* Right — ways to participate */}
          <div>
            <h2 className="font-tum text-sm font-bold uppercase tracking-[0.14em] text-tum-muted">
              {t.waysTitle}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.ways.map(([title, body, cta, href, external]) => (
                <article
                  key={title}
                  className="flex flex-col border-4 border-double border-tum-ink bg-tum-paper p-6"
                >
                  <h3 className="font-tum text-lg font-extrabold text-tum-ink">{title}</h3>
                  <p className="mt-2 flex-1 font-tum text-sm leading-relaxed text-tum-muted">{body}</p>
                  <div className="mt-5">
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-center gap-2 border-2 border-tum-ink px-6 py-3 font-tum text-sm font-bold uppercase tracking-wide text-tum-ink transition-colors duration-200 hover:bg-tum-ink hover:text-white"
                    >
                      {cta}
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoutePage>
  )
}
