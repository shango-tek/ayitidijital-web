import { RoutePage } from '@/components/pages/RoutePage'
import { Button } from '@/components/ui/Button'
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
    note: 'Nou poko gen yon sistèm don an liy. Pou kontribye kounye a, ekri nou dirèkteman epi n ap jwenn pi bon fason an ansanm.',
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
    note: 'Nous n’avons pas encore de système de don en ligne. Pour contribuer dès maintenant, écrivez-nous directement et nous trouverons ensemble la meilleure voie.',
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
    note: 'We don’t have an online donation system yet. To contribute right now, write to us directly and we’ll find the best route together.',
  },
} as const

/**
 * "Soutni" — the Support / donate destination. There is no online payment set
 * up, so this page is honest about it: it lists real ways to help (partner,
 * contribute code, spread the word) with working links, and a note that
 * financial support currently goes through direct contact — rather than a fake
 * donate button.
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
      title={t.title}
      subtitle={t.sub}
      image="/headers/travay-nou.webp"
    >
      <div className="page-wrap">
        <p className="max-w-3xl font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.4] tracking-tight text-primary">
          {t.intro}
        </p>

        <h2 className="mt-14 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink-soft/70">
          {t.waysTitle}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.ways.map(([title, body, cta, href, external]) => (
            <article
              key={title}
              className="flex flex-col rounded-card border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
            >
              <h3 className="font-display text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{body}</p>
              <div className="mt-5">
                <Button variant="gold" href={href} size="sm" external={external} arrow>
                  {cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl border-l-2 border-gold-deep/35 pl-4 text-sm leading-relaxed text-ink-soft">
          {t.note}
        </p>
      </div>
    </RoutePage>
  )
}
