import type { ReactNode } from 'react'
import type { LangOption } from '../components/ui/LangSwitcher'
import type { NavLink } from '../components/layout/SiteNav'
import type { HeroCta } from '../components/sections/HeroBroadcast'
import type { StatItem } from '../components/sections/StatsBand'
import type { Project } from '../components/sections/ProjectsGrid'
import type { HubDefinition, HubProgram } from '../components/sections/HubPrograms'
import type { DiasporaCtaAction } from '../components/sections/DiasporaCta'
import type { SitemapColumn, SocialLink } from '../components/layout/SitemapFooter'
import type { Locale } from '../i18n'

/* ------------------------------------------------------------------ *
 * All page copy lives here so components stay content-agnostic and
 * reusable. Content is keyed by locale; `page.tsx` calls
 * `getSiteContent(locale)` and spreads the fields into components with
 * the exact same prop shape they had when the copy was inline.
 * ------------------------------------------------------------------ */

/** Locale-independent icon set, referenced by the per-locale project copy. */
const ProjectIcons = {
  lexhaiti: (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
      <g fill="#12246B">
        <rect x="7" y="8" width="26" height="7" rx="2" />
        <rect x="7" y="20" width="34" height="7" rx="2" />
        <rect x="7" y="32" width="18" height="7" rx="2" />
        <rect x="30" y="32" width="7" height="7" rx="2" fill="#5D74C4" transform="rotate(14 33.5 35.5)" />
      </g>
    </svg>
  ),
  archive: (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
      <g fill="#12246B">
        <rect x="6" y="24" width="36" height="17" rx="3" />
        <rect x="19" y="30" width="10" height="5" rx="1.5" fill="#F4EFE6" />
        <rect x="14" y="13" width="8" height="8" rx="2" transform="rotate(-12 18 17)" />
        <rect x="27" y="8" width="7" height="7" rx="2" fill="#5D74C4" transform="rotate(18 30.5 11.5)" />
        <rect x="36" y="15" width="6" height="6" rx="1.5" fill="#5D74C4" transform="rotate(-20 39 18)" />
      </g>
    </svg>
  ),
  school: (
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
      <g fill="#12246B">
        <rect x="12" y="9" width="8" height="8" rx="2" />
        <rect x="6" y="20" width="8" height="8" rx="2" />
        <rect x="12" y="31" width="8" height="8" rx="2" />
        <rect x="28" y="9" width="8" height="8" rx="2" />
        <rect x="34" y="20" width="8" height="8" rx="2" />
        <rect x="28" y="31" width="8" height="8" rx="2" />
        <rect x="21" y="26" width="6" height="6" rx="1.5" fill="#5D74C4" />
        <rect x="24" y="16" width="6" height="6" rx="1.5" fill="#5D74C4" />
      </g>
    </svg>
  ),
} as const

/* ------------------------------------------------------------------ *
 * Content shape
 * ------------------------------------------------------------------ */

export interface HeroPanelContent {
  banner: { label: string; href: string }
  title: ReactNode
  sub: string
  subLang: string
  ctas: HeroCta[]
}

export interface SectionHeadContent {
  kicker: string
  title: string
  sub: string
  subLang: string
}

export interface DiasporaContent {
  kicker: string
  title: string
  lead: string
  leadEn?: string
  cities: string[]
  ctas: DiasporaCtaAction[]
}

export interface NewsletterField {
  label: string
  placeholder: string
}

export interface NewsletterContent {
  kicker: string
  title: string
  body: string
  /** Privacy-policy link shown under the body copy. */
  privacy: { label: string; href: string }
  firstName: NewsletterField
  lastName: NewsletterField
  email: NewsletterField
  /** Data-processing consent line next to the submit button. */
  consent: string
  /** Submit button label. */
  button: string
  /** Confirmation shown after a successful (mock) subscribe. */
  confirm: string
}

export interface KonbitFooterLink { label: string; href: string }
export interface KonbitFooterContent {
  tagline: { lead: string; muted: string }
  socialLabel: string
  navTitle: string
  orgTitle: string
  orgLinks: KonbitFooterLink[]
  luckyText: string
  ctaLead: string
  ctaStrong: string
  /** Haitian proverb shown on the footer's bottom-right line. */
  proverb: string
}

export interface SiteContent {
  brandName: string
  /** Skip-to-content link text. */
  skipToContent: string
  /** Stats band kicker (was hard-coded "An chif" in page.tsx). */
  statsKicker: string
  /** Support CTA button label (nav, desktop + mobile). */
  supportLabel: string
  navLinks: NavLink[]
  heroPanel: HeroPanelContent
  stats: StatItem[]
  projectsSection: SectionHeadContent
  projects: Project[]
  hubSection: SectionHeadContent
  hubDefinition: HubDefinition
  hubPrograms: HubProgram[]
  diaspora: DiasporaContent
  marqueeWords: string[]
  /** Footer blurb under the brand lockup (was hard-coded in page.tsx). */
  footerBlurb: string
  newsletter: NewsletterContent
  footerColumns: SitemapColumn[]
  footerCopyright: string
  footerSocials: SocialLink[]
  /** Konbit (two-card) footer strings. */
  konbitFooter: KonbitFooterContent
  /** Per-locale <title>/<meta description> for generateMetadata. */
  metaTitle: string
  metaDescription: string
}

/* ------------------------------------------------------------------ *
 * Locale-independent bits
 * ------------------------------------------------------------------ */

/** KR/FR/EN switcher options. `code` doubles as the locale id. */
export const langs: LangOption[] = [
  { code: 'en', label: 'EN', lang: 'en', name: 'English' },
  { code: 'fr', label: 'FR', lang: 'fr', name: 'Français' },
  { code: 'ht', label: 'HT', lang: 'ht', name: 'Kreyòl' },
]

const footerSocials: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'X', href: 'https://x.com', icon: 'x' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  // Placeholder — swap href for the real WhatsApp channel invite link once live.
  { label: 'Canal WhatsApp', href: '#', icon: 'whatsapp' },
]

/* ------------------------------------------------------------------ *
 * Kreyòl (default) — the original copy, verbatim.
 * ------------------------------------------------------------------ */

const ht: SiteContent = {
  brandName: 'Ayiti Dijital',
  supportLabel: 'Sipòte',
  skipToContent: 'Ale nan kontni an',
  statsKicker: 'An chif',
  navLinks: [
    { label: 'Travay Nou', href: '#pwoje' },
    { label: 'Nouvèl & evènman', href: '#nouvel' },
    { label: 'Ekosistèm', href: '#ekosistem' },
    {
      label: 'Sou nou',
      href: '#sou-nou',
      children: [
        { label: 'Vizyon & misyon', href: '#vizyon' },
        { label: 'Prensip nou yo', href: '#prensip' },
        { label: 'Ekip', href: '#ekip' },
        { label: 'Karyè', href: '#karye' },
      ],
    },
  ],
  heroPanel: {
    banner: { label: 'Ayiti Dijital fonde ofisyèlman — jen 2026, Minik', href: '#sou-nou' },
    title: (
      <>
        Lanbi a sonnen.
        <br />
        <em>Konbit dijital</em> la kòmanse.
      </>
    ),
    sub: 'Enfrastrikti dijital louvri pou Ayiti ak dyaspora li — lwa, achiv, konpetans ak zouti open source ki pou tout moun.',
    subLang: 'ht',
    ctas: [
      {
        label: (
          <>
            Dekouvri pwojè yo <span aria-hidden="true">→</span>
          </>
        ),
        href: '#pwoje',
        variant: 'navy',
      },
      { label: 'Antre nan konbit la', href: '#kominote', variant: 'sand' },
    ],
  },
  stats: [
    { num: '12,000+', label: 'dokiman legal dijitalize', sub: 'documents juridiques numérisés', subLang: 'fr' },
    { num: '3', label: 'platfòm louvri', sub: 'plateformes ouvertes au public', subLang: 'fr' },
    { num: '2 peyi', label: 'yon sèl kominote', sub: 'Allemagne + Haïti, une communauté', subLang: 'fr' },
    { num: '100%', label: 'kòd sous louvri', sub: 'code libre, données ouvertes', subLang: 'fr' },
  ],
  projectsSection: {
    kicker: 'Pwojè',
    title: 'Sa n ap bati kounye a',
    sub: 'Des plateformes ouvertes, construites au grand jour — sous licence libre, pour toujours.',
    subLang: 'fr',
  },
  projects: [
    {
      icon: ProjectIcons.lexhaiti,
      chip: 'An liy',
      title: 'LexHaiti',
      kr: 'Lwa ak jistis aksesib pou tout moun. Tout kò lejislatif ayisyen an — chèche, li, pataje — gratis.',
      tr: 'La loi haïtienne, consultable et citable en ligne.',
      trLang: 'fr',
      link: { label: 'Vizite LexHaiti', href: '#' },
    },
    {
      icon: ProjectIcons.archive,
      chip: 'An konstriksyon',
      title: 'Achiv Dijital',
      kr: 'Moniteur ak achiv istorik yo an liy — depi 1804 rive jodi a, paj pa paj, louvri pou rechèch.',
      tr: 'Le Moniteur et les archives historiques, numérisés et ouverts.',
      trLang: 'fr',
      link: { label: 'Swiv pwogrè a', href: '#' },
    },
    {
      icon: ProjectIcons.school,
      chip: 'Ap vini · 2027',
      title: 'Lekòl Kòd',
      kr: 'Fòmasyon ak konpetans dijital: kou an Kreyòl, pwojè reyèl, mentò ki soti nan dyaspora a.',
      tr: 'Compétences numériques et mentorat pour la prochaine génération.',
      trLang: 'fr',
      link: { label: 'Di nou ou enterese', href: '#' },
    },
  ],
  hubSection: {
    kicker: 'Pou kominote a',
    title: 'Hub la pa yon bilding. Se yon konbit.',
    sub: 'Sant inovasyon nou an vityèl anvan tout bagay — li viv sou sit sa a, nan repo nou yo ak nan apèl kominote a. Louvri pou tout moun, kèlkeswa kote yo ye.',
    subLang: 'ht',
  },
  hubDefinition: {
    word: 'konbit',
    pron: '/kon-bit/ · non',
    body: 'Tradisyon ayisyen kote tout yon kominote mete men ansanm pou fè travay youn pa t ap ka fè pou kont li.',
    tr: 'Tradition haïtienne du travail collectif. Nous faisons pareil — avec du code.',
    trLang: 'fr',
  },
  hubPrograms: [
    {
      title: 'Konbit open source',
      kr: 'Chak mwa nou kode ansanm sou pwojè piblik yo — depi premye issue ou jiska premye release ou.',
      en: 'Monthly build sprints on our open repositories.',
    },
    {
      title: 'Atelye ak webinar',
      kr: 'Sesyon gratis an Kreyòl ak an franse: devlopman wèb, done louvri, entèlijans atifisyèl.',
      en: 'Free hands-on workshops, recorded and shared openly.',
    },
    {
      title: 'Mentora youn-a-youn',
      kr: 'Enjenyè dyaspora yo akonpaye jèn talan an Ayiti — sis mwa, yon objektif klè.',
      en: 'Diaspora engineers mentor young developers in Haiti.',
    },
    {
      title: 'Rezo dyaspora a',
      kr: 'Minik, Monreyal, Miami, Pòtoprens: yon sèl rezo pwofesyonèl k ap grandi chak jou.',
      en: 'A growing professional network across two continents.',
    },
  ],
  diaspora: {
    kicker: 'Konbit dijital',
    title: 'Ou pa oblije an Ayiti pou w bati pou Ayiti.',
    lead: 'Kèlkeswa kote w ye — premye pull request ou se men w nan konbit la. Vin kode, vin fòme, vin dokimante, vin tradwi.',
    leadEn: 'Build with us from anywhere. Your first pull request is your hand in the konbit.',
    cities: ['MINIK', 'MONREYAL', 'MIAMI', 'PARI', 'PÒTOPRENS'],
    ctas: [
      { label: 'Vin manm kounye a', href: '#', variant: 'red' },
      {
        label: (
          <>
            Gade kòd la sou GitHub <span aria-hidden="true">↗</span>
          </>
        ),
        href: 'https://github.com/',
        variant: 'ghost',
        external: true,
      },
    ],
  },
  marqueeWords: [
    'AYITI DIJITAL',
    'DEMOKRATIZE',
    'DIJITALIZE',
    'TRANSFÒME',
    'KONEKTE',
    'INOVASYON',
    'TALAN',
    'ENPAK',
  ],
  footerBlurb: 'Enfrastrikti dijital louvri pou Ayiti ak dyaspora li — lwa, achiv, konpetans ak zouti open source.',
  newsletter: {
    kicker: 'Enfòlèt',
    title: 'Mize a jou chak mwa',
    body: 'Rete konekte ak rezo Ayiti Dijital la — nouvèl, evènman ak startup k ap dechennen. Yon ti gout kilti kreyativite dijital, dirèkteman nan bwat imel ou.',
    privacy: { label: 'Deklarasyon konfidansyalite', href: '#' },
    firstName: { label: 'Prenon', placeholder: 'Ada' },
    lastName: { label: 'Non', placeholder: 'Lovelace' },
    email: { label: 'Imel', placeholder: 'ada.lovelace@imel.com' },
    consent: 'Mwen dakò pou nou trete done pèsonèl mwen yo nan bi pou voye enfòlèt la ban mwen.',
    button: 'Wi, abòne',
    confirm: 'Mèsi! Ou abòne nan enfòlèt la.',
  },
  footerColumns: [
    {
      heading: 'Sou nou',
      links: [
        { label: 'Vizyon & misyon', href: '#vizyon' },
        { label: 'Prensip nou yo', href: '#prensip' },
        { label: 'Ekip', href: '#ekip' },
        { label: 'Karyè', href: '#karye' },
      ],
    },
    {
      heading: 'Ekosistèm',
      links: [
        { label: 'Fè yon don', href: '#don' },
        { label: 'Vin nan kominote a', href: '#kominote' },
        { label: 'Kontak', href: '#kontak' },
      ],
    },
    {
      heading: 'Tematik',
      links: [
        { label: 'Dijitalizasyon & IA', href: '#tematik' },
        { label: 'Dirablite', href: '#tematik' },
        { label: 'Antreprenarya', href: '#tematik' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Mansyon legal', href: '#' },
        { label: 'Konfidansyalite', href: '#' },
      ],
    },
  ],
  footerCopyright: '© 2026 Ayiti Dijital · Tout dwa rezève.',
  footerSocials,
  konbitFooter: {
    tagline: { lead: 'Konbit dijital la,', muted: 'pou tout Ayiti ak dyaspora li.' },
    socialLabel: 'Rete an kontak !',
    navTitle: 'Navigasyon',
    orgTitle: 'Òganizasyon',
    orgLinks: [
      { label: 'Vizyon & misyon', href: '#vizyon' },
      { label: 'Prensip nou yo', href: '#prensip' },
      { label: 'Mansyon legal', href: '#' },
      { label: 'Konfidansyalite', href: '#' },
    ],
    luckyText: 'Anvi bati ?',
    ctaLead: 'Teknoloji ap vanse vit.',
    ctaStrong: 'Ann bati l ansanm.',
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — Lanbi a sonnen, konbit dijital la kòmanse',
  metaDescription:
    'Ayiti Dijital e.V. ap bati enfrastrikti dijital louvri pou Ayiti ak dyaspora li: lwa, achiv, fòmasyon ak zouti open source.',
}

/* ------------------------------------------------------------------ *
 * Français
 * ------------------------------------------------------------------ */

const fr: SiteContent = {
  brandName: 'Ayiti Dijital',
  supportLabel: 'Soutenir',
  skipToContent: 'Aller au contenu',
  statsKicker: 'En chiffres',
  navLinks: [
    { label: 'Notre Travail', href: '#pwoje' },
    { label: 'Actualités & événements', href: '#nouvel' },
    { label: 'Écosystème', href: '#ekosistem' },
    {
      label: 'À propos',
      href: '#sou-nou',
      children: [
        { label: 'Vision & mission', href: '#vizyon' },
        { label: 'Nos principes', href: '#prensip' },
        { label: 'Équipe', href: '#ekip' },
        { label: 'Carrières', href: '#karye' },
      ],
    },
  ],
  heroPanel: {
    banner: { label: 'Ayiti Dijital officiellement fondée — juin 2026, Munich', href: '#sou-nou' },
    title: (
      <>
        La lambi résonne.
        <br />
        Le <em>konbit numérique</em> commence.
      </>
    ),
    sub: 'Une infrastructure numérique libre et ouverte pour Haïti et sa diaspora — lois, archives, compétences et outils open source qui appartiennent à tous.',
    subLang: 'fr',
    ctas: [
      {
        label: (
          <>
            Découvrir les projets <span aria-hidden="true">→</span>
          </>
        ),
        href: '#pwoje',
        variant: 'navy',
      },
      { label: 'Rejoindre le konbit', href: '#kominote', variant: 'sand' },
    ],
  },
  stats: [
    { num: '12 000+', label: 'documents juridiques numérisés', sub: 'dokiman legal dijitalize', subLang: 'ht' },
    { num: '3', label: 'plateformes ouvertes', sub: 'ouvertes au public', subLang: 'fr' },
    { num: '2 pays', label: 'une seule communauté', sub: 'Allemagne + Haïti', subLang: 'fr' },
    { num: '100%', label: 'code source ouvert', sub: 'code libre, données ouvertes', subLang: 'fr' },
  ],
  projectsSection: {
    kicker: 'Projets',
    title: 'Ce que nous construisons',
    sub: 'Des plateformes ouvertes, construites au grand jour — sous licence libre, pour toujours.',
    subLang: 'fr',
  },
  projects: [
    {
      icon: ProjectIcons.lexhaiti,
      chip: 'En ligne',
      title: 'LexHaiti',
      kr: 'Le droit et la justice accessibles à tous. Tout le corpus législatif haïtien — rechercher, lire, partager — gratuitement.',
      tr: 'La loi haïtienne, consultable et citable en ligne.',
      trLang: 'fr',
      link: { label: 'Visiter LexHaiti', href: '#' },
    },
    {
      icon: ProjectIcons.archive,
      chip: 'En construction',
      title: 'Archives numériques',
      kr: 'Le Moniteur et les archives historiques en ligne — de 1804 à aujourd’hui, page par page, ouverts à la recherche.',
      tr: 'Le Moniteur et les archives historiques, numérisés et ouverts.',
      trLang: 'fr',
      link: { label: 'Suivre l’avancement', href: '#' },
    },
    {
      icon: ProjectIcons.school,
      chip: 'À venir · 2027',
      title: 'École de code',
      kr: 'Formation et compétences numériques : cours en créole, projets réels, mentorat issu de la diaspora.',
      tr: 'Compétences numériques et mentorat pour la prochaine génération.',
      trLang: 'fr',
      link: { label: 'Manifester votre intérêt', href: '#' },
    },
  ],
  hubSection: {
    kicker: 'Pour la communauté',
    title: 'Le hub n’est pas un bâtiment. C’est un konbit.',
    sub: 'Notre hub d’innovation est virtuel avant tout — il vit sur ce site, dans nos dépôts et dans nos appels communautaires. Ouvert à tous, depuis partout.',
    subLang: 'fr',
  },
  hubDefinition: {
    word: 'konbit',
    pron: '/kon-bit/ · nom',
    body: 'Tradition haïtienne où toute une communauté met la main à la pâte pour accomplir un travail que personne ne pourrait faire seul.',
    tr: 'Nou fè menm bagay la — ak kòd.',
    trLang: 'ht',
  },
  hubPrograms: [
    {
      title: 'Konbit open source',
      kr: 'Chaque mois, nous codons ensemble sur des projets publics — de ta première issue à ta première release.',
      en: 'Monthly build sprints on our open repositories.',
    },
    {
      title: 'Ateliers & webinaires',
      kr: 'Des sessions gratuites en créole et en français : développement web, données ouvertes, intelligence artificielle.',
      en: 'Free hands-on workshops, recorded and shared openly.',
    },
    {
      title: 'Mentorat individuel',
      kr: 'Des ingénieurs de la diaspora accompagnent de jeunes talents en Haïti — six mois, un objectif clair.',
      en: 'Diaspora engineers mentor young developers in Haiti.',
    },
    {
      title: 'Le réseau de la diaspora',
      kr: 'Munich, Montréal, Miami, Port-au-Prince : un seul réseau professionnel qui grandit chaque jour.',
      en: 'A growing professional network across two continents.',
    },
  ],
  diaspora: {
    kicker: 'Konbit numérique',
    title: 'Pas besoin d’être en Haïti pour bâtir pour Haïti.',
    lead: 'Où que tu sois — ta première pull request, c’est ta main dans le konbit. Viens coder, viens te former, viens documenter, viens traduire.',
    leadEn: 'Build with us from anywhere. Your first pull request is your hand in the konbit.',
    cities: ['MUNICH', 'MONTRÉAL', 'MIAMI', 'PARIS', 'PORT-AU-PRINCE'],
    ctas: [
      { label: 'Devenir membre', href: '#', variant: 'red' },
      {
        label: (
          <>
            Voir le code sur GitHub <span aria-hidden="true">↗</span>
          </>
        ),
        href: 'https://github.com/',
        variant: 'ghost',
        external: true,
      },
    ],
  },
  marqueeWords: [
    'AYITI DIJITAL',
    'DÉMOCRATISER',
    'NUMÉRISER',
    'TRANSFORMER',
    'CONNECTER',
    'INNOVATION',
    'TALENT',
    'IMPACT',
  ],
  footerBlurb: 'Une infrastructure numérique libre et ouverte pour Haïti et sa diaspora — lois, archives, compétences et outils open source.',
  newsletter: {
    kicker: 'Infolettre',
    title: 'Mises à jour mensuelles',
    body: 'Restez connecté·e au réseau Ayiti Dijital — actualités, événements et startups qui décollent. Une dose de culture créative numérique, directement dans votre boîte mail.',
    privacy: { label: 'Politique de confidentialité', href: '#' },
    firstName: { label: 'Prénom', placeholder: 'Ada' },
    lastName: { label: 'Nom', placeholder: 'Lovelace' },
    email: { label: 'E-mail', placeholder: 'ada.lovelace@email.com' },
    consent: 'J’accepte le traitement de mes données personnelles aux fins de l’envoi de l’infolettre.',
    button: 'Oui, je m’abonne',
    confirm: 'Merci ! Vous êtes bien abonné·e.',
  },
  footerColumns: [
    {
      heading: 'À propos',
      links: [
        { label: 'Vision & mission', href: '#vizyon' },
        { label: 'Nos principes', href: '#prensip' },
        { label: 'Équipe', href: '#ekip' },
        { label: 'Carrières', href: '#karye' },
      ],
    },
    {
      heading: 'Écosystème',
      links: [
        { label: 'Faire un don', href: '#don' },
        { label: 'Rejoindre la communauté', href: '#kominote' },
        { label: 'Contact', href: '#kontak' },
      ],
    },
    {
      heading: 'Thématiques',
      links: [
        { label: 'Digitalisation & IA', href: '#tematik' },
        { label: 'Durabilité', href: '#tematik' },
        { label: 'Entrepreneuriat', href: '#tematik' },
      ],
    },
    {
      heading: 'Légal',
      links: [
        { label: 'Mentions légales', href: '#' },
        { label: 'Confidentialité', href: '#' },
      ],
    },
  ],
  footerCopyright: '© 2026 Ayiti Dijital · Tous droits réservés.',
  footerSocials,
  konbitFooter: {
    tagline: { lead: 'Le konbit numérique,', muted: 'pour Haïti et sa diaspora.' },
    socialLabel: 'Restons en contact !',
    navTitle: 'Navigation',
    orgTitle: 'Organisation',
    orgLinks: [
      { label: 'Vision & mission', href: '#vizyon' },
      { label: 'Nos principes', href: '#prensip' },
      { label: 'Mentions légales', href: '#' },
      { label: 'Confidentialité', href: '#' },
    ],
    luckyText: 'Envie de bâtir ?',
    ctaLead: 'Le numérique avance vite.',
    ctaStrong: 'Bâtissons-le ensemble.',
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — La lambi résonne, le konbit numérique commence',
  metaDescription:
    'Ayiti Dijital e.V. construit une infrastructure numérique libre et ouverte pour Haïti et sa diaspora : lois, archives, formation et outils open source.',
}

/* ------------------------------------------------------------------ *
 * English
 * ------------------------------------------------------------------ */

const en: SiteContent = {
  brandName: 'Ayiti Dijital',
  supportLabel: 'Support',
  skipToContent: 'Skip to content',
  statsKicker: 'By the numbers',
  navLinks: [
    { label: 'Our Work', href: '#pwoje' },
    { label: 'News & events', href: '#nouvel' },
    { label: 'Ecosystem', href: '#ekosistem' },
    {
      label: 'About',
      href: '#sou-nou',
      children: [
        { label: 'Vision & mission', href: '#vizyon' },
        { label: 'Our principles', href: '#prensip' },
        { label: 'Team', href: '#ekip' },
        { label: 'Careers', href: '#karye' },
      ],
    },
  ],
  heroPanel: {
    banner: { label: 'Ayiti Dijital officially founded — June 2026, Munich', href: '#sou-nou' },
    title: (
      <>
        The conch shell sounds.
        <br />
        The <em>digital konbit</em> begins.
      </>
    ),
    sub: 'Free, open digital infrastructure for Haiti and its diaspora — laws, archives, skills and open-source tools that belong to everyone.',
    subLang: 'en',
    ctas: [
      {
        label: (
          <>
            Explore the projects <span aria-hidden="true">→</span>
          </>
        ),
        href: '#pwoje',
        variant: 'navy',
      },
      { label: 'Join the konbit', href: '#kominote', variant: 'sand' },
    ],
  },
  stats: [
    { num: '12,000+', label: 'legal documents digitized', sub: 'dokiman legal dijitalize', subLang: 'ht' },
    { num: '3', label: 'open platforms', sub: 'open to the public', subLang: 'en' },
    { num: '2 countries', label: 'one community', sub: 'Germany + Haiti', subLang: 'en' },
    { num: '100%', label: 'open source code', sub: 'free code, open data', subLang: 'en' },
  ],
  projectsSection: {
    kicker: 'Projects',
    title: 'What we’re building now',
    sub: 'Open platforms, built in the open — free-licensed, forever.',
    subLang: 'en',
  },
  projects: [
    {
      icon: ProjectIcons.lexhaiti,
      chip: 'Online',
      title: 'LexHaiti',
      kr: 'Law and justice accessible to everyone. The entire Haitian legislative corpus — search, read, share — for free.',
      tr: 'Haitian law, searchable and citable online.',
      trLang: 'en',
      link: { label: 'Visit LexHaiti', href: '#' },
    },
    {
      icon: ProjectIcons.archive,
      chip: 'In progress',
      title: 'Digital Archives',
      kr: 'Le Moniteur and the historical archives online — from 1804 to today, page by page, open for research.',
      tr: 'Le Moniteur and the historical archives, digitized and open.',
      trLang: 'en',
      link: { label: 'Follow the progress', href: '#' },
    },
    {
      icon: ProjectIcons.school,
      chip: 'Coming · 2027',
      title: 'Code School',
      kr: 'Training and digital skills: courses in Kreyòl, real projects, mentors from the diaspora.',
      tr: 'Digital skills and mentorship for the next generation.',
      trLang: 'en',
      link: { label: 'Register your interest', href: '#' },
    },
  ],
  hubSection: {
    kicker: 'For the community',
    title: 'The hub isn’t a building. It’s a konbit.',
    sub: 'Our innovation hub is virtual first — it lives on this site, in our repos and in our community calls. Open to anyone, from anywhere.',
    subLang: 'en',
  },
  hubDefinition: {
    word: 'konbit',
    pron: '/kon-bit/ · noun',
    body: 'A Haitian tradition where a whole community joins hands to do work no one could do alone.',
    tr: 'We do the same thing — with code.',
    trLang: 'en',
  },
  hubPrograms: [
    {
      title: 'Open-source konbit',
      kr: 'Every month we code together on public projects — from your first issue to your first release.',
      en: 'Monthly build sprints on our open repositories.',
    },
    {
      title: 'Workshops & webinars',
      kr: 'Free sessions in Kreyòl and French: web development, open data, artificial intelligence.',
      en: 'Free hands-on workshops, recorded and shared openly.',
    },
    {
      title: 'One-on-one mentorship',
      kr: 'Diaspora engineers support young talent in Haiti — six months, one clear goal.',
      en: 'Diaspora engineers mentor young developers in Haiti.',
    },
    {
      title: 'The diaspora network',
      kr: 'Munich, Montréal, Miami, Port-au-Prince: one professional network growing every day.',
      en: 'A growing professional network across two continents.',
    },
  ],
  diaspora: {
    kicker: 'Digital konbit',
    title: 'You don’t have to be in Haiti to build for Haiti.',
    lead: 'Wherever you are — your first pull request is your hand in the konbit. Come code, come learn, come document, come translate.',
    leadEn: 'Build with us from anywhere. Your first pull request is your hand in the konbit.',
    cities: ['MUNICH', 'MONTRÉAL', 'MIAMI', 'PARIS', 'PORT-AU-PRINCE'],
    ctas: [
      { label: 'Become a member', href: '#', variant: 'red' },
      {
        label: (
          <>
            View the code on GitHub <span aria-hidden="true">↗</span>
          </>
        ),
        href: 'https://github.com/',
        variant: 'ghost',
        external: true,
      },
    ],
  },
  marqueeWords: [
    'AYITI DIJITAL',
    'DEMOCRATIZE',
    'DIGITIZE',
    'TRANSFORM',
    'CONNECT',
    'INNOVATION',
    'TALENT',
    'IMPACT',
  ],
  footerBlurb: 'Free, open digital infrastructure for Haiti and its diaspora — laws, archives, skills and open-source tools.',
  newsletter: {
    kicker: 'Newsletter',
    title: 'Monthly updates',
    body: 'Stay connected to the Ayiti Dijital network — news, events and startups taking off. A dose of creative digital culture, straight to your inbox.',
    privacy: { label: 'Privacy policy', href: '#' },
    firstName: { label: 'First name', placeholder: 'Ada' },
    lastName: { label: 'Last name', placeholder: 'Lovelace' },
    email: { label: 'Email', placeholder: 'ada.lovelace@email.com' },
    consent: 'I consent to the processing of my personal data for the purpose of sending the newsletter.',
    button: 'Yes, subscribe',
    confirm: 'Thanks! You’re subscribed.',
  },
  footerColumns: [
    {
      heading: 'About',
      links: [
        { label: 'Vision & mission', href: '#vizyon' },
        { label: 'Our principles', href: '#prensip' },
        { label: 'Team', href: '#ekip' },
        { label: 'Careers', href: '#karye' },
      ],
    },
    {
      heading: 'Ecosystem',
      links: [
        { label: 'Donate', href: '#don' },
        { label: 'Join the community', href: '#kominote' },
        { label: 'Contact', href: '#kontak' },
      ],
    },
    {
      heading: 'Themes',
      links: [
        { label: 'Digitalization & AI', href: '#tematik' },
        { label: 'Sustainability', href: '#tematik' },
        { label: 'Entrepreneurship', href: '#tematik' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Legal notice', href: '#' },
        { label: 'Privacy', href: '#' },
      ],
    },
  ],
  footerCopyright: '© 2026 Ayiti Dijital · All rights reserved.',
  footerSocials,
  konbitFooter: {
    tagline: { lead: 'The digital konbit,', muted: 'for Haiti and its diaspora.' },
    socialLabel: 'Stay in touch!',
    navTitle: 'Navigation',
    orgTitle: 'Organization',
    orgLinks: [
      { label: 'Vision & mission', href: '#vizyon' },
      { label: 'Our principles', href: '#prensip' },
      { label: 'Legal notice', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
    luckyText: 'Ready to build?',
    ctaLead: 'Tech moves fast.',
    ctaStrong: "Let's build it together.",
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — The conch sounds, the digital konbit begins',
  metaDescription:
    'Ayiti Dijital e.V. is building free, open digital infrastructure for Haiti and its diaspora: laws, archives, training and open-source tools.',
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

const CONTENT: Record<Locale, SiteContent> = { ht, fr, en }

/** Returns the fully-typed site copy for a given locale. */
export function getSiteContent(locale: Locale): SiteContent {
  return CONTENT[locale]
}
