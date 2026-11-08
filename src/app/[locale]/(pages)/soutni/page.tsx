import { RoutePage } from '@/components/pages/RoutePage'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

const GITHUB = 'https://github.com/shango-tek/ayitidijital-web'
const MAIL = 'contact@ayitidijital.org'

const T = {
  ht: {
    title: 'Soutni',
    sub: 'Ede nou bati byen piblik dijital pou Ayiti.',
    intro:
      'Ayiti Dijital se yon asosyasyon k ap fèt. Sipò ou — tan, konpetans oswa mwayen — se sa k ap kenbe zouti sa yo louvri epi gratis pou tout moun.',
    waysTitle: 'Fason pou w sipòte',
    ways: [
      ['Vin patnè', 'Òganizasyon, enstitisyon oswa antrepriz : ann bati ansanm epi finanse pwojè yo.', 'Ekri nou', `mailto:${MAIL}`, false],
      ['Kontribye nan kòd la', 'Ann bati zouti open source yo ansanm — chak kontribisyon konte.', 'Ale nan kominote a', '/kominote', false],
      ['Gaye mesaj la', 'Pale sou travay nou an, pataje pwojè yo, konekte nou ak moun ki ka ede.', 'Wè kòd la sou GitHub', GITHUB, true],
    ],
  },
  fr: {
    title: 'Soutenir',
    sub: 'Aidez-nous à bâtir des biens publics numériques pour Haïti.',
    intro:
      'Ayiti Dijital est une association en cours de fondation. Votre soutien — temps, compétences ou moyens — est ce qui garde ces outils ouverts et gratuits pour tous.',
    waysTitle: 'Comment soutenir',
    ways: [
      ['Devenir partenaire', 'Organisation, institution ou entreprise : bâtissons ensemble et finançons les projets.', 'Écrivez-nous', `mailto:${MAIL}`, false],
      ['Contribuer au code', 'Construisons les outils open source ensemble — chaque contribution compte.', 'Rejoindre la communauté', '/kominote', false],
      ['Faire connaître', 'Parlez de notre travail, partagez les projets, connectez-nous à qui peut aider.', 'Voir le code sur GitHub', GITHUB, true],
    ],
  },
  en: {
    title: 'Support',
    sub: 'Help us build digital public goods for Haiti.',
    intro:
      'Ayiti Dijital is an association in formation. Your support — time, skills or means — is what keeps these tools open and free for everyone.',
    waysTitle: 'Ways to support',
    ways: [
      ['Become a partner', 'Organisation, institution or company: let’s build together and fund the projects.', 'Write to us', `mailto:${MAIL}`, false],
      ['Contribute code', 'Let’s build the open-source tools together — every contribution counts.', 'Join the community', '/kominote', false],
      ['Spread the word', 'Talk about our work, share the projects, connect us to those who can help.', 'See the code on GitHub', GITHUB, true],
    ],
  },
} as const

/**
 * "Soutni" — the Support / donate destination, in the UnternehmerTUM register.
 * There is no online payment set up, so this page is honest about it: real ways
 * to help (partner, contribute code, spread the word) with working links, and a
 * note that financial support currently goes through direct contact.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/soutni', locale, T[toLocale(locale)].title)
}

export default async function SoutniPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = toLocale(localeParam)
  const c = getSiteContent(locale)
  const t = T[locale]

  return (
    <RoutePage
      content={c}
      path="/soutni"
      title={c.pageTitles.support}
      subtitle={t.sub}
      image="/headers/travay-nou.webp"
    >
      <div className="page-wrap">
        <p className="max-w-3xl font-tum text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.4] tracking-tight text-tum-ink">
          {t.intro}
        </p>

        <h2 className="mt-14 font-tum text-sm font-bold uppercase tracking-[0.14em] text-tum-muted">
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
                  className="group inline-flex items-center gap-2 bg-electric px-6 py-3 font-tum text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
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
    </RoutePage>
  )
}
