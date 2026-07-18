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
  /** Hero headline, split into typographically-styled tokens
   *  (line 1: verb + subject, line 2: with + vision + and + action). */
  heroTitle: {
    shaping: string
    tomorrow: string
    with: string
    vision: string
    and: string
    action: string
  }
  /** Footer "back to top" scroll button label. */
  scrollTopLabel: string
  /** Hero sub-headline paragraph (full copy on tablet/desktop, condensed on phone). */
  heroDescription: { full: string; short: string }
  heroPanel: HeroPanelContent
  stats: StatItem[]
  projectsSection: SectionHeadContent
  projects: Project[]
  /** Status filter chips on the Travay Nou (what-we-do) page. */
  projectFilters: { all: string; active: string; dev: string; coming: string }
  /** End-row CTA under the home ecosystem/projects grid (caption + "view all"). */
  homeEcosystemCta: { caption: string; viewAll: string }
  hubSection: SectionHeadContent
  hubDefinition: HubDefinition
  hubPrograms: HubProgram[]
  diaspora: DiasporaContent
  marqueeWords: string[]
  /** The three aspirational verbs shown in the spiral's eye — they roll one at a
   *  time as you scroll, then resolve into all three together at the end. */
  spiralCenterWords: [string, string, string]
  /** "Beyond digital" mission intro under the hero: eyebrow, headline (gold period),
   *  lead, CTA label, and photo alt text. */
  about: { label: string; title: string; strokeWord?: string; lead: string; cta: string; imageAlt: string }
  /** "Who we are" pillars — Mission / Vision / Devise. */
  pillars: { label: string; items: { name: string; body: string }[] }
  /** The About page's long-form content. The Mission / Vision / Devise headlines
   *  are the `pillars` bodies above — this carries the paragraph under each, plus
   *  the origin story and the team framing. Kept separate from `pillars` so the
   *  home page's short cards stay short. */
  aboutPage: {
    missionLabel: string
    missionBody: string
    visionLabel: string
    visionBody: string
    deviseLabel: string
    /** Eyebrow + headline over the numbered origin story. */
    storyLabel: string
    storyTitle: string
    /** Five stages, in order. The numbering is chronological, not decorative. */
    story: { kicker: string; title: string; body: string }[]
    teamLabel: string
    teamTitle: string
  }
  /** "What we do" overview — eyebrow, split title (outline word + rest), lead, three
   *  Bati / Enkibe / Konekte pillar cards, and an end-row CTA. */
  whatWeDo: {
    label: string
    strokeWord: string
    titleRest: string
    subtitle: string
    outro: string
    viewAll: string
    cards: { label: string; title: string; body: string; cta: string }[]
  }
  /** "Explore our ecosystem" — incubated-projects carousel: eyebrow, split title
   *  (outline accent word + rest), subtitle, six project cards, and an end-row CTA. */
  ecosystem: {
    label: string
    strokeWord: string
    titleRest: string
    subtitle: string
    outro: string
    viewAll: string
    projects: {
      name: string
      tagline: string
      status: string
      statusKey: 'active' | 'dev' | 'soon'
      icon: 'book' | 'data' | 'cap' | 'map' | 'chart' | 'heart'
      image: string
    }[]
  }
  /** "Domaines d'action" — SDG-aligned theme cards (title, desc, SDG number, tag). */
  domaines: {
    label: string
    title: string
    subtitle: string
    /** Locale-appropriate SDG prefix on the tile — "ODD" (fr/ht) / "SDG" (en). */
    sdgPrefix: string
    items: { name: string; description: string; sdg: string; tags: string[] }[]
  }
  /** "Le Journal" — blog teaser: split header, three article cards, view-all. */
  journal: {
    label: string
    strokeWord: string
    titleRest: string
    subtitle: string
    readMore: string
    viewAll: string
    posts: { category: string; date: string; title: string; image: string }[]
  }
  /** FAQ — eyebrow + stroke headline + lead (left), accordion (right). */
  faq: {
    label: string
    strokeWord: string
    titleRest: string
    subtitle: string
    items: { q: string; a: string }[]
  }
  /** "Passe à l'action" — split header + two audience cards (fund / contribute). */
  action: {
    label: string
    title: string
    subtitle: string
    fundKreyol: string
    fundTitle: string
    fundDesc: string
    fundButton: string
    codeKreyol: string
    codeTitle: string
    codeDesc: string
    codeButton: string
  }
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
  heroTitle: { shaping: 'Fasonnen', tomorrow: 'Demen', with: 'ak', vision: 'Vizyon', and: '&', action: 'Aksyon' },
  scrollTopLabel: 'Tounen anlè',
  heroDescription: {
    full: "Enfrastrikti dijital louvri pou Ayiti ak dyaspora li — lwa, achiv, konpetans ak zouti open source ki pou tout moun.",
    short: "Enfrastrikti dijital louvri pou Ayiti ak dyaspora li — lwa, achiv ak zouti open source ki pou tout moun.",
  },
  skipToContent: 'Ale nan kontni an',
  statsKicker: 'An chif',
  navLinks: [
    { label: 'Travay Nou', href: '/travay-nou' },
    { label: 'Nouvèl & evènman', href: '/nouvel' },
    { label: 'Ekosistèm', href: '/ekosistem' },
    {
      label: 'Sou nou',
      href: '/sou-nou',
      children: [
        { label: 'Vizyon & misyon', href: '/sou-nou#vizyon' },
        { label: 'Prensip nou yo', href: '/sou-nou#prensip' },
        { label: 'Ekip', href: '/sou-nou#ekip' },
        // { label: 'Karyè', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
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
      { label: 'Antre nan konbit la', href: '/kominote', variant: 'sand' },
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
  projectFilters: { all: 'Tout', active: 'An liy', dev: 'An konstriksyon', coming: 'Ap vini' },
  homeEcosystemCta: { caption: 'Yon ekosistèm ki ap grandi — louvri, an kreyòl, pou tout moun.', viewAll: 'Wè tout sa n ap fè' },
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
  spiralCenterWords: ['Imajine', 'Bati', 'Transfòme'],
  about: {
    label: 'Pi lwen pase dijital',
    title: 'Kreye yon enpak dirab.',
    strokeWord: 'enpak',
    lead: "Nou se yon òganizasyon ki gide pa yon misyon : fòje transfòmasyon nimerik Ayiti a. Antanke yon Kalfou Inovasyon Sivik, nou devlope pwojè pou enterè piblik epi nou akonpaye etidyan, kreyatè ak òganizasyon yo pou ede yo reyalize lide yo ak devlope inovasyon teknolojik alawonnbadè.",
    cta: 'Aprann plis',
    imageAlt: 'Transfòmasyon dijital an aksyon',
  },
  pillars: {
    label: 'Kiyès nou ye',
    items: [
      { name: 'Misyon', body: 'Enkube solisyon epi pwopilse talan yo.' },
      { name: 'Vizyon', body: 'Kolòn vètebral nimerik Ayiti.' },
      { name: 'Deviz', body: 'Chanjman nimerik Ayiti a dwe soti nan Ayiti li menm.' },
    ],
  },
  aboutPage: {
    missionLabel: 'Misyon',
    missionBody: "Kòm yon hub inovasyon, misyon nou se konsevwa enfrastrikti nimerik ki gen itilite piblik epi ofri yon ekosistèm enkibasyon konplè pou etidyan ak kreyatè. Nou transfòme lide brit an inovasyon ki ka kanpe, pou dinamize ekosistèm nasyonal la nan yon fason ki dire.",
    visionLabel: 'Vizyon',
    visionBody: "Bati yon nasyon ki souvren teknolojikman, kote chak sitwayen gen aksè lib ak done ki gen itilite piblik, kote enstitisyon yo apiye sou sistèm transparan, epi kote inovasyon lokal ranplase depandans teknolojik.",
    deviseLabel: 'Deviz',
    storyLabel: 'Istwa nou',
    storyTitle: "Depi yon konsta rive nan yon mouvman.",
    story: [
      {
        kicker: 'Konsta a',
        title: 'Enfòmasyon piblik la, san aksè',
        body: "Tèks lwa ou pa ka jwenn, done gaye toupatou, sèvis nimerik ki pa la : pou sitwayen yo, jwenn enfòmasyon ki gen itilite piblik te rete yon gwo defi.",
      },
      {
        kicker: 'Estriktirasyon an',
        title: 'Nesans Hub la',
        body: "Ayiti Dijital pran yon kad enterè jeneral, panse pou pote enfrastrikti teknolojik nan tout transparans, pa Ayiti epi pou Ayiti.",
      },
      {
        kicker: 'Premye pwojè a',
        title: 'LexHaiti mete dwa a anliy',
        body: "Plis pase 2 400 tèks jiridik (Konstitisyon, kòd, lwa) vin lib pou konsilte. Prèv konkrè ke enfrastrikti piblik nimerik posib.",
      },
      {
        kicker: 'Elajisman an',
        title: 'Yon ekosistèm k ap enkibe',
        body: "Tranzisyon vè yon modèl hub konplè. Ouvèti pwogram nou yo pou akeyi epi pwopilse pwojè ak start-up (komèsyal, sosyal, sivik) nouvèl jenerasyon an.",
      },
      {
        kicker: 'Vizyon an',
        title: 'Yon nasyon nimerik souvren',
        body: "Elaji enfrastrikti yo, fòme talan yo, libere potansyèl antreprenarial la : mouvman an lanse pou bati yon otonomi teknolojik ki dire.",
      },
    ],
    teamLabel: 'Ekip la',
    teamTitle: 'Moun ki responsab yo',
  },
  whatWeDo: {
    label: 'Sa nou fè',
    strokeWord: 'Dekouvri',
    titleRest: 'travay nou',
    subtitle: 'Yon doub motè : enfrastrikti nimerik souvren ki gen itilite piblik ak yon enkibatè ki transfòme lide etidyan yo ak kreyatè yo an start-up ki ka kanpe.',
    outro: 'Eksplore sa n ap bati epi vin jwenn mouvman an.',
    viewAll: 'Gade tout travay nou',
    cards: [
      { label: 'BATI', title: 'Enfrastrikti piblik', body: 'N ap bati byen piblik nimerik souvren, ak LexHaiti kòm pwojè pilòt fonse nou an : 2 400+ tèks jiridik ak istorik santralize epi aksesib.', cta: 'Gade pwojè yo' },
      { label: 'ENKIBE', title: 'Enkibatè ekosistèm', body: 'Nou akonpaye etidyan ak kreyatè pou fè pwòp start-up pa yo eklate, kit yo komèsyal, teknolojik oswa sosyal.', cta: 'Pwogram nou yo' },
      { label: 'KONEKTE', title: 'Rezo & souverènte', body: "Depi ann Ayiti, n ap konekte talan lokal yo, enstitisyon yo ak ekosistèm entènasyonal la pou katalize inovasyon.", cta: 'Vin jwenn nou' },
    ],
  },
  ecosystem: {
    label: 'Pwojè nou yo',
    strokeWord: 'Eksplore',
    titleRest: 'ekosistèm nou an',
    subtitle: 'Soti nan lide rive nan lansman piblik : pwojè hub la ap fè kouve pou demokratize enfòmasyon ann Ayiti.',
    outro: 'Dekouvri tout pwojè hub la enkibe yo.',
    viewAll: 'Wè tout pwojè yo',
    projects: [
      { name: 'LexHaiti', tagline: 'Pòtay transparans jiridik, louvri epi verifyab', status: 'Aktif', statusKey: 'active', icon: 'book', image: '/ecosystem/lexhaiti.webp' },
      { name: 'Civic Data API', tagline: 'Done piblik ouvè pou Ayiti', status: 'An devlopman', statusKey: 'dev', icon: 'data', image: '/ecosystem/civic-data.webp' },
      { name: 'Civic Tech Academy', tagline: 'Fòme batisè demen yo', status: 'Byento', statusKey: 'soon', icon: 'cap', image: '/ecosystem/academy.webp' },
      { name: 'OpenHaïti Map', tagline: 'Katografi ouvè teritwa ayisyen an', status: 'An devlopman', statusKey: 'dev', icon: 'map', image: '/ecosystem/openhaiti-map.webp' },
      { name: 'Budget Citoyen', tagline: 'Transparans bidjetè pou tout moun', status: 'Byento', statusKey: 'soon', icon: 'chart', image: '/ecosystem/budget-citoyen.webp' },
      { name: 'e-Santé Haïti', tagline: 'Enfòmasyon medikal ouvè', status: 'Byento', statusKey: 'soon', icon: 'heart', image: '/ecosystem/esante.webp' },
    ],
  },
  domaines: {
    label: 'Tematik nou yo',
    title: 'Domèn aksyon',
    subtitle: 'Ayiti Dijital estriktire entèvansyon li yo otou sis domèn konplemantè, ki fòme yon ekosistèm koyeran pou devlopman imen ak enstitisyonèl.',
    sdgPrefix: 'ODD',
    items: [
      { name: 'Edikasyon', description: 'Aksè ak yon edikasyon de kalite; ranfòse konpetans akademik, pwofesyonèl ak antreprenarya.', sdg: '4', tags: ['#civictech', '#edikasyon'] },
      { name: 'Teknoloji', description: 'Platfòm nimerik ak zouti entèlijans atifisyèl nan sèvis sivik, demokrasi ak inovasyon.', sdg: '9', tags: ['#opensource', '#teknoloji'] },
      { name: 'Dwa Moun', description: 'Defann dwa sivil ak politik, konbat diskou rayisman, epi ankouraje yon espas sivik enklizif.', sdg: '16', tags: ['#legaltech', '#jistis'] },
      { name: 'Jèn yo', description: 'Akonpaye jèn talan yo ak mentora epi opòtinite pou fè pwochen jenerasyon batisè yo eklate.', sdg: '8', tags: ['#jènès', '#opòtinite'] },
      { name: 'Devlopman Ekonomik', description: 'Antreprenarya, enkibasyon start-up ak kreyasyon valè dirab pou kominote ayisyen yo.', sdg: '8', tags: ['#antreprenarya', '#ekonomi'] },
      { name: 'Done Ouvè', description: 'Ouvri done piblik Ayiti yo pou batisè, chèchè ak enstitisyon — transparans demokratik kòmanse ak aksè ak done.', sdg: '16/17', tags: ['#opendata', '#transparans'] },
    ],
  },
  journal: {
    label: 'Jounal la',
    strokeWord: 'Nouvèl,',
    titleRest: 'istwa & vwa',
    subtitle: 'Eksplore nouvèl nou, nòt teren ak istwa enpak ki fè chanjman an avanse.',
    readMore: 'Li atik la',
    viewAll: 'Tout atik yo',
    posts: [
      { category: 'Pwojè', date: '12 me 2026', title: 'LexHaiti lanse : aksè nan dwa pou tout moun', image: '/blog/lexhaiti-hero.jpg' },
      { category: 'Kominote', date: '28 avr. 2026', title: 'Fòme pwochen jenerasyon batisè yo', image: '/blog/collaboration.webp' },
      { category: 'Lide', date: '9 avr. 2026', title: 'Poukisa done ouvè enpòtan pou Ayiti', image: '/blog/analytics.webp' },
    ],
  },
  faq: {
    label: 'FAQ',
    strokeWord: 'Kesyon',
    titleRest: 'ou yo, repons nou yo.',
    subtitle: 'Tout sa ou bezwen konnen sou sipò, kontribisyon ak angajman nan hub la.',
    items: [
      { q: 'Ki misyon Ayiti Dijital?', a: 'N ap fè kouve epi lanse byen piblik nimerik ki nan enterè piblik la pou demokratize aksè a enfòmasyon ak opòtinite ann Ayiti.' },
      { q: 'Kijan don yo itilize?', a: 'Chak kontribisyon finanse dirèkteman devlopman pwojè yo, pwogram fòmasyon yo ak enfrastrikti ouvè nou mete disponib pou tout moun.' },
      { q: 'Èske mwen ka kontribye kòm volontè?', a: 'Wi. Devlopè, jiris, designer oswa sitwayen angaje — gen yon plas pou chak moun, sou GitHub kou nan pwogram nou yo.' },
      { q: 'Anplis don, kijan mwen ka ede?', a: 'Pataje pwojè nou yo, rejwenn kominote a, pwopoze yon lide, oswa vin yon patnè enstitisyonèl hub la.' },
      { q: 'Kijan pou m vin yon patnè?', a: 'Kontakte nou sou paj Kontak la : nou bati ekosistèm nan ak enstitisyon, inivèsite ak òganizasyon ki aliyen ak valè nou yo.' },
    ],
  },
  action: {
    label: 'Pase a aksyon',
    title: 'Bati baz dijital Ayiti.',
    subtitle: 'De fason pou fè misyon an vanse — chwazi pa w la.',
    fundKreyol: 'PATNÈ',
    fundTitle: 'Finanse yon pwojè',
    fundDesc: 'Òganizasyon, bayè, dyaspora : sipò w transfòme pwototip civic tech an enfrastrikti piblik dirab.',
    fundButton: 'Vin yon patnè',
    codeKreyol: 'KÒDE',
    codeTitle: 'Kontribye nan kòd la',
    codeDesc: 'Devlopè, designer, jiris oswa tradiktè : chak pwojè hub la louvri epi verifyab, epi l ap tann ou.',
    codeButton: 'Antre nan kominote a',
  },
  footerBlurb: 'Enfrastrikti dijital louvri pou Ayiti ak dyaspora li — lwa, achiv, konpetans ak zouti open source.',
  newsletter: {
    kicker: 'Enfòlèt',
    title: 'Mize a jou chak mwa',
    body: 'Rete konekte ak rezo Ayiti Dijital la — nouvèl, evènman ak startup k ap dechennen. Yon ti gout kilti kreyativite dijital, dirèkteman nan bwat imel ou.',
    privacy: { label: 'Deklarasyon konfidansyalite', href: '/konfidansyalite' },
    firstName: { label: 'Prenon', placeholder: 'Ada' },
    lastName: { label: 'Non', placeholder: 'Lovelace' },
    email: { label: 'Imel', placeholder: 'ada.lovelace@imel.com' },
    consent: 'Mwen dakò pou nou trete done pèsonèl mwen yo nan bi pou voye enfòlèt la ban mwen.',
    button: 'Wi, abòne',
    confirm: 'Mèsi! N ap tounen vin jwenn ou byen vit.',
  },
  footerColumns: [
    {
      heading: 'Sou nou',
      links: [
        { label: 'Vizyon & misyon', href: '/sou-nou#vizyon' },
        { label: 'Prensip nou yo', href: '/sou-nou#prensip' },
        { label: 'Ekip', href: '/sou-nou#ekip' },
        // { label: 'Karyè', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
      ],
    },
    {
      heading: 'Ekosistèm',
      links: [
        { label: 'Fè yon don', href: '/soutni' },
        { label: 'Vin nan kominote a', href: '/kominote' },
        { label: 'Kontak', href: 'mailto:contact@ayitidijital.org' },
      ],
    },
    {
      heading: 'Tematik',
      links: [
        { label: 'Dijitalizasyon & IA', href: '/#domenn' },
        { label: 'Dirablite', href: '/#domenn' },
        { label: 'Antreprenarya', href: '/#domenn' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Mansyon legal', href: '/enfomasyon-legal' },
        { label: 'Konfidansyalite', href: '/konfidansyalite' },
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
      { label: 'Mansyon legal', href: '/enfomasyon-legal' },
      { label: 'Konfidansyalite', href: '/konfidansyalite' },
    ],
    luckyText: 'Anvi bati ?',
    ctaLead: 'Teknoloji ap vanse vit.',
    ctaStrong: 'Ann bati l ansanm.',
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — Lanbi a sonnen, konbit dijital la kòmanse',
  metaDescription:
    'Ayiti Dijital ap bati enfrastrikti dijital louvri pou Ayiti ak dyaspora li: lwa, achiv, fòmasyon ak zouti open source.',
}

/* ------------------------------------------------------------------ *
 * Français
 * ------------------------------------------------------------------ */

const fr: SiteContent = {
  brandName: 'Ayiti Dijital',
  supportLabel: 'Soutenir',
  heroTitle: { shaping: 'Façonner', tomorrow: "l'Avenir", with: 'avec', vision: 'Vision', and: '&', action: 'Action.' },
  scrollTopLabel: 'Haut de page',
  heroDescription: {
    full: "Une infrastructure numérique libre et ouverte pour Haïti et sa diaspora — lois, archives, compétences et outils open source qui appartiennent à tous.",
    short: "Une infrastructure numérique libre et ouverte pour Haïti et sa diaspora — lois, archives et outils open source.",
  },
  skipToContent: 'Aller au contenu',
  statsKicker: 'En chiffres',
  navLinks: [
    { label: 'Notre Travail', href: '/travay-nou' },
    { label: 'Actualités & événements', href: '/nouvel' },
    { label: 'Écosystème', href: '/ekosistem' },
    {
      label: 'À propos',
      href: '/sou-nou',
      children: [
        { label: 'Vision & mission', href: '/sou-nou#vizyon' },
        { label: 'Nos principes', href: '/sou-nou#prensip' },
        { label: 'Équipe', href: '/sou-nou#ekip' },
        // { label: 'Carrières', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
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
      { label: 'Rejoindre le konbit', href: '/kominote', variant: 'sand' },
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
  projectFilters: { all: 'Tous', active: 'En ligne', dev: 'En construction', coming: 'À venir' },
  homeEcosystemCta: { caption: 'Un écosystème ouvert, en créole, qui grandit chaque jour.', viewAll: 'Voir tout ce que nous faisons' },
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
  spiralCenterWords: ['Imaginer', 'Bâtir', 'Transformer'],
  about: {
    label: 'Au-delà du numérique',
    title: 'Créer un impact durable.',
    strokeWord: 'impact',
    lead: "Nous sommes une organisation guidée par une mission : façonner la transformation numérique d'Haïti. En tant que Hub d'Innovation Civic, nous développons des projets d'intérêt public et accompagnons les étudiants, les créateurs et les organisations pour concrétiser leurs idées et développer des innovations technologiques de manière globale.",
    cta: 'En savoir plus',
    imageAlt: 'La transformation numérique en action',
  },
  pillars: {
    label: 'Qui nous sommes',
    items: [
      { name: 'Mission', body: 'Incuber des solutions et propulser les talents.' },
      { name: 'Vision', body: "La colonne vertébrale numérique d'Haïti." },
      { name: 'Devise', body: "La transformation numérique d'Haïti doit venir d'Haïti." },
    ],
  },
  aboutPage: {
    missionLabel: 'Mission',
    missionBody: "En tant que hub d'innovation, notre mission est de concevoir des infrastructures numériques d'intérêt public et d'offrir un écosystème d'incubation complet aux étudiants et créateurs. Nous transformons les idées brutes en innovations viables pour dynamiser durablement l'écosystème national.",
    visionLabel: 'Vision',
    visionBody: "Bâtir une nation technologiquement souveraine où chaque citoyen accède librement aux données d'intérêt public, où les institutions s'appuient sur des systèmes transparents, et où l'innovation locale remplace la dépendance technologique.",
    deviseLabel: 'Devise',
    storyLabel: 'Istwa nou',
    storyTitle: "D'un constat à un mouvement.",
    story: [
      {
        kicker: 'Le constat',
        title: "L'information publique, inaccessible",
        body: "Textes de loi introuvables, données dispersées, services numériques absents : pour les citoyens, l'accès à l'information d'intérêt public restait un défi majeur.",
      },
      {
        kicker: 'La structuration',
        title: 'La naissance du Hub',
        body: "Ayiti Dijital se dote d'un cadre d'intérêt général, pensé pour porter des infrastructures technologiques en toute transparence, par et pour Haïti.",
      },
      {
        kicker: 'Le premier projet',
        title: 'LexHaiti met le droit en ligne',
        body: "Plus de 2 400 textes juridiques (Constitution, codes, lois) deviennent librement consultables. La preuve concrète que l'infrastructure publique numérique est possible.",
      },
      {
        kicker: "L'élargissement",
        title: 'Un écosystème en incubation',
        body: "Transition vers un modèle de hub complet. Ouverture de nos programmes pour accueillir et propulser les projets et start-ups (commerciaux, sociaux, civiques) de la nouvelle génération.",
      },
      {
        kicker: 'La vision',
        title: 'Une nation numérique souveraine',
        body: "Étendre les infrastructures, former les talents, libérer le potentiel entrepreneurial : le mouvement est lancé pour bâtir une autonomie technologique durable.",
      },
    ],
    teamLabel: "L'équipe",
    teamTitle: 'Les personnes responsables',
  },
  whatWeDo: {
    label: 'Ce que nous faisons',
    strokeWord: 'Découvre',
    titleRest: 'notre travail',
    subtitle: "Un double moteur : des infrastructures numériques souveraines d'utilité publique et un incubateur qui transforme les idées des étudiants et des créateurs en start-ups viables.",
    outro: 'Explorez ce que nous bâtissons et rejoignez le mouvement.',
    viewAll: 'Voir tout notre travail',
    cards: [
      { label: 'BATI', title: 'Infrastructures publiques', body: 'Nous bâtissons des biens publics numériques souverains, avec LexHaiti comme projet pilote phare : 2 400+ textes juridiques et historiques centralisés et accessibles.', cta: 'Voir les projets' },
      { label: 'ENKIBE', title: "Incubateur d'écosystème", body: "Nous accompagnons étudiants et créateurs pour faire éclore leurs propres start-ups, qu'elles soient commerciales, technologiques ou sociales.", cta: 'Nos programmes' },
      { label: 'KONEKTE', title: 'Réseau & souveraineté', body: "Depuis Haïti, nous relions talents locaux, institutions et écosystème international pour catalyser l'innovation.", cta: 'Rejoindre' },
    ],
  },
  ecosystem: {
    label: 'Nos projets',
    strokeWord: 'Explore',
    titleRest: 'notre écosystème',
    subtitle: "De l'idée au lancement public : les projets que le hub incube pour démocratiser l'information en Haïti.",
    outro: 'Découvrez tous les projets incubés par le hub.',
    viewAll: 'Voir tous les projets',
    projects: [
      { name: 'LexHaiti', tagline: 'Portail de transparence juridique, ouvert et auditable', status: 'Actif', statusKey: 'active', icon: 'book', image: '/ecosystem/lexhaiti.webp' },
      { name: 'Civic Data API', tagline: 'Données publiques ouvertes pour Haïti', status: 'En développement', statusKey: 'dev', icon: 'data', image: '/ecosystem/civic-data.webp' },
      { name: 'Civic Tech Academy', tagline: 'Former les bâtisseurs de demain', status: 'Bientôt', statusKey: 'soon', icon: 'cap', image: '/ecosystem/academy.webp' },
      { name: 'OpenHaïti Map', tagline: 'Cartographie ouverte du territoire haïtien', status: 'En développement', statusKey: 'dev', icon: 'map', image: '/ecosystem/openhaiti-map.webp' },
      { name: 'Budget Citoyen', tagline: 'Transparence budgétaire pour tous', status: 'Bientôt', statusKey: 'soon', icon: 'chart', image: '/ecosystem/budget-citoyen.webp' },
      { name: 'e-Santé Haïti', tagline: 'Information médicale ouverte', status: 'Bientôt', statusKey: 'soon', icon: 'heart', image: '/ecosystem/esante.webp' },
    ],
  },
  domaines: {
    label: 'Nos thématiques',
    title: "Domaines d'action",
    subtitle: 'Ayiti Dijital structure ses interventions autour de six domaines complémentaires, qui forment un écosystème cohérent de développement humain et institutionnel.',
    sdgPrefix: 'ODD',
    items: [
      { name: 'Éducation', description: 'Accès à une éducation de qualité, renforcement des compétences académiques, professionnelles et entrepreneuriales.', sdg: '4', tags: ['#civictech', '#edikasyon'] },
      { name: 'Technologie', description: "Plateformes numériques, outils d'intelligence artificielle au service du civisme, de la démocratie et de l'innovation.", sdg: '9', tags: ['#opensource', '#teknoloji'] },
      { name: 'Droits Humains', description: "Défense des droits civils et politiques, lutte contre les discours de haine, promotion d'un espace civique inclusif.", sdg: '16', tags: ['#legaltech', '#jistis'] },
      { name: 'Jeunesse', description: 'Accompagnement des jeunes talents, mentorat et opportunités pour faire éclore la prochaine génération de bâtisseurs.', sdg: '8', tags: ['#jènès', '#opòtinite'] },
      { name: 'Développement Économique', description: 'Entrepreneuriat, incubation de start-ups et création de valeur durable pour les communautés haïtiennes.', sdg: '8', tags: ['#antreprenarya', '#ekonomi'] },
      { name: 'Données ouvertes', description: "Ouvrir les données publiques d'Haïti aux bâtisseurs, chercheurs et institutions — la transparence démocratique commence par l'accès.", sdg: '16/17', tags: ['#opendata', '#transparans'] },
    ],
  },
  journal: {
    label: 'Le journal',
    strokeWord: 'Actualités,',
    titleRest: 'récits & voix',
    subtitle: "Explorez nos nouvelles, notes de terrain et récits d'impact qui font avancer le changement.",
    readMore: "Lire l'article",
    viewAll: 'Tous les articles',
    posts: [
      { category: 'Projet', date: '12 mai 2026', title: "Lancement de LexHaiti : l'accès au droit pour tous", image: '/blog/lexhaiti-hero.jpg' },
      { category: 'Communauté', date: '28 avr. 2026', title: 'Former la prochaine génération de bâtisseurs', image: '/blog/collaboration.webp' },
      { category: 'Idées', date: '9 avr. 2026', title: 'Pourquoi les données ouvertes comptent pour Haïti', image: '/blog/analytics.webp' },
    ],
  },
  faq: {
    label: 'FAQ',
    strokeWord: 'Vos',
    titleRest: 'questions, nos réponses.',
    subtitle: "Tout ce qu'il faut savoir sur le soutien, la contribution et l'engagement au sein du hub.",
    items: [
      { q: "Quelle est la mission d'Ayiti Dijital ?", a: "Nous incubons et lançons des biens publics numériques d'intérêt public pour démocratiser l'accès à l'information et aux opportunités en Haïti." },
      { q: 'Comment sont utilisés les dons ?', a: "Chaque contribution finance directement le développement des projets, les programmes de formation et l'infrastructure ouverte que nous mettons à disposition de tous." },
      { q: 'Puis-je contribuer bénévolement ?', a: "Oui. Développeurs, juristes, designers ou citoyens engagés — il y a une place pour chacun, sur GitHub comme dans nos programmes." },
      { q: 'Au-delà du don, comment aider ?', a: 'Partagez nos projets, rejoignez la communauté, proposez une idée, ou devenez partenaire institutionnel du hub.' },
      { q: 'Comment devenir partenaire ?', a: "Écrivez-nous via la page Contact : nous construisons l'écosystème avec des institutions, des universités et des organisations alignées sur nos valeurs." },
    ],
  },
  action: {
    label: "Passe à l'action",
    title: "Bâtir la colonne vertébrale numérique d'Haïti.",
    subtitle: 'Deux façons de faire avancer le mouvement — choisis la tienne.',
    fundKreyol: 'PATNÈ',
    fundTitle: 'Financer un projet',
    fundDesc: 'Organisations, bailleurs, diaspora : votre soutien transforme des prototypes civic tech en infrastructures publiques durables.',
    fundButton: 'Devenir partenaire',
    codeKreyol: 'KÒDE',
    codeTitle: 'Contribuer au code',
    codeDesc: "Développeur·se, designer, juriste ou traducteur·rice : chaque projet du hub est ouvert et auditable, et t'attend.",
    codeButton: 'Rejoindre la communauté',
  },
  footerBlurb: 'Une infrastructure numérique libre et ouverte pour Haïti et sa diaspora — lois, archives, compétences et outils open source.',
  newsletter: {
    kicker: 'Infolettre',
    title: 'Mises à jour mensuelles',
    body: 'Restez connecté·e au réseau Ayiti Dijital — actualités, événements et startups qui décollent. Une dose de culture créative numérique, directement dans votre boîte mail.',
    privacy: { label: 'Politique de confidentialité', href: '/konfidansyalite' },
    firstName: { label: 'Prénom', placeholder: 'Ada' },
    lastName: { label: 'Nom', placeholder: 'Lovelace' },
    email: { label: 'E-mail', placeholder: 'ada.lovelace@email.com' },
    consent: 'J’accepte le traitement de mes données personnelles aux fins de l’envoi de l’infolettre.',
    button: 'Oui, je m’abonne',
    confirm: 'Merci ! Nous revenons vers vous très vite.',
  },
  footerColumns: [
    {
      heading: 'À propos',
      links: [
        { label: 'Vision & mission', href: '/sou-nou#vizyon' },
        { label: 'Nos principes', href: '/sou-nou#prensip' },
        { label: 'Équipe', href: '/sou-nou#ekip' },
        // { label: 'Carrières', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
      ],
    },
    {
      heading: 'Écosystème',
      links: [
        { label: 'Faire un don', href: '/soutni' },
        { label: 'Rejoindre la communauté', href: '/kominote' },
        { label: 'Contact', href: 'mailto:contact@ayitidijital.org' },
      ],
    },
    {
      heading: 'Thématiques',
      links: [
        { label: 'Digitalisation & IA', href: '/#domenn' },
        { label: 'Durabilité', href: '/#domenn' },
        { label: 'Entrepreneuriat', href: '/#domenn' },
      ],
    },
    {
      heading: 'Légal',
      links: [
        { label: 'Mentions légales', href: '/enfomasyon-legal' },
        { label: 'Confidentialité', href: '/konfidansyalite' },
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
      { label: 'Mentions légales', href: '/enfomasyon-legal' },
      { label: 'Confidentialité', href: '/konfidansyalite' },
    ],
    luckyText: 'Envie de bâtir ?',
    ctaLead: 'Le numérique avance vite.',
    ctaStrong: 'Bâtissons-le ensemble.',
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — La lambi résonne, le konbit numérique commence',
  metaDescription:
    'Ayiti Dijital construit une infrastructure numérique libre et ouverte pour Haïti et sa diaspora : lois, archives, formation et outils open source.',
}

/* ------------------------------------------------------------------ *
 * English
 * ------------------------------------------------------------------ */

const en: SiteContent = {
  brandName: 'Ayiti Dijital',
  supportLabel: 'Support',
  heroTitle: { shaping: 'Shaping', tomorrow: 'Tomorrow', with: 'with', vision: 'Vision', and: '&', action: 'Action.' },
  scrollTopLabel: 'Back to top',
  heroDescription: {
    full: "Free, open digital infrastructure for Haiti and its diaspora — laws, archives, skills and open-source tools that belong to everyone.",
    short: "Free, open digital infrastructure for Haiti and its diaspora — laws, archives and open-source tools.",
  },
  skipToContent: 'Skip to content',
  statsKicker: 'By the numbers',
  navLinks: [
    { label: 'Our Work', href: '/travay-nou' },
    { label: 'News & events', href: '/nouvel' },
    { label: 'Ecosystem', href: '/ekosistem' },
    {
      label: 'About',
      href: '/sou-nou',
      children: [
        { label: 'Vision & mission', href: '/sou-nou#vizyon' },
        { label: 'Our principles', href: '/sou-nou#prensip' },
        { label: 'Team', href: '/sou-nou#ekip' },
        // { label: 'Careers', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
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
      { label: 'Join the konbit', href: '/kominote', variant: 'sand' },
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
  projectFilters: { all: 'All', active: 'Live', dev: 'In dev', coming: 'Coming' },
  homeEcosystemCta: { caption: 'An open, Kreyòl-first ecosystem, growing every day.', viewAll: 'See everything we do' },
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
  spiralCenterWords: ['Imagine', 'Build', 'Transform'],
  about: {
    label: 'Beyond digitalization',
    title: 'Create lasting impact.',
    strokeWord: 'impact',
    lead: "We are a purpose-driven organization guided by a single mission: to shape Haiti's digital transformation. As a Civic Innovation Hub, we develop public-interest projects and empower students, creators, and organizations to bring their ideas to life and develop technological innovations holistically.",
    cta: 'Learn more',
    imageAlt: 'Digital transformation in action',
  },
  pillars: {
    label: 'Who we are',
    items: [
      { name: 'Mission', body: 'Incubating solutions and propelling talent.' },
      { name: 'Vision', body: "Haiti's digital backbone." },
      { name: 'Motto', body: "Haiti's digital transformation must come from Haiti." },
    ],
  },
  aboutPage: {
    missionLabel: 'Mission',
    missionBody: "As an innovation hub, our mission is to design digital infrastructure in the public interest and to offer students and creators a complete incubation ecosystem. We turn raw ideas into viable innovations, to energise the national ecosystem for the long run.",
    visionLabel: 'Vision',
    visionBody: "To build a technologically sovereign nation where every citizen has free access to data held in the public interest, where institutions run on transparent systems, and where local innovation replaces technological dependence.",
    deviseLabel: 'Motto',
    storyLabel: 'Istwa nou',
    storyTitle: 'From an observation to a movement.',
    story: [
      {
        kicker: 'The observation',
        title: 'Public information, out of reach',
        body: "Statutes nobody could find, data scattered across sources, digital services absent: for citizens, reaching information held in the public interest remained a real obstacle.",
      },
      {
        kicker: 'The structure',
        title: 'The Hub is founded',
        body: "Ayiti Dijital gives itself a public-interest framing, built to carry technological infrastructure transparently — by Haiti and for Haiti.",
      },
      {
        kicker: 'The first project',
        title: 'LexHaiti puts the law online',
        body: "More than 2,400 legal texts (the Constitution, the codes, the statutes) become freely searchable. Concrete proof that public digital infrastructure is possible.",
      },
      {
        kicker: 'The widening',
        title: 'An ecosystem in incubation',
        body: "The shift to a full hub model. Our programmes open up to host and propel the next generation's projects and start-ups — commercial, social and civic alike.",
      },
      {
        kicker: 'The vision',
        title: 'A sovereign digital nation',
        body: "Extend the infrastructure, train the talent, unlock the entrepreneurial potential: the movement is under way to build lasting technological autonomy.",
      },
    ],
    teamLabel: 'The team',
    teamTitle: 'The people accountable',
  },
  whatWeDo: {
    label: 'What we do',
    strokeWord: 'Discover',
    titleRest: 'our work',
    subtitle: 'A dual engine: sovereign digital infrastructure for the public good, and an incubator that turns the ideas of students and creators into viable start-ups.',
    outro: 'Explore what we are building and join the movement.',
    viewAll: 'View all our work',
    cards: [
      { label: 'BATI', title: 'Public infrastructure', body: 'We build sovereign digital public goods, with LexHaiti as our flagship pilot project: 2,400+ legal and historical texts brought together and made accessible.', cta: 'View the projects' },
      { label: 'ENKIBE', title: 'Ecosystem incubator', body: 'We support students and creators in bringing their own start-ups to life, whether commercial, technological or social.', cta: 'Our programmes' },
      { label: 'KONEKTE', title: 'Network & sovereignty', body: 'From Haiti, we connect local talent, institutions, and the international ecosystem to catalyze innovation.', cta: 'Join us' },
    ],
  },
  ecosystem: {
    label: 'Our projects',
    strokeWord: 'Explore',
    titleRest: 'our ecosystem',
    subtitle: 'From idea to public launch: the projects the hub incubates to democratize access to information in Haiti.',
    outro: 'Discover all the projects incubated by the hub.',
    viewAll: 'See all projects',
    projects: [
      { name: 'LexHaiti', tagline: 'A legal transparency portal, open and auditable', status: 'Active', statusKey: 'active', icon: 'book', image: '/ecosystem/lexhaiti.webp' },
      { name: 'Civic Data API', tagline: 'Open public data for Haiti', status: 'In development', statusKey: 'dev', icon: 'data', image: '/ecosystem/civic-data.webp' },
      { name: 'Civic Tech Academy', tagline: "Training tomorrow's builders", status: 'Coming soon', statusKey: 'soon', icon: 'cap', image: '/ecosystem/academy.webp' },
      { name: 'OpenHaïti Map', tagline: 'Open mapping of the Haitian territory', status: 'In development', statusKey: 'dev', icon: 'map', image: '/ecosystem/openhaiti-map.webp' },
      { name: 'Budget Citoyen', tagline: 'Budget transparency for all', status: 'Coming soon', statusKey: 'soon', icon: 'chart', image: '/ecosystem/budget-citoyen.webp' },
      { name: 'e-Santé Haïti', tagline: 'Open medical information', status: 'Coming soon', statusKey: 'soon', icon: 'heart', image: '/ecosystem/esante.webp' },
    ],
  },
  domaines: {
    label: 'Our themes',
    title: 'Areas of action',
    subtitle: 'Ayiti Dijital structures its work around six complementary areas that form a coherent ecosystem of human and institutional development.',
    sdgPrefix: 'SDG',
    items: [
      { name: 'Education', description: 'Access to quality education; strengthening academic, professional and entrepreneurial skills.', sdg: '4', tags: ['#civictech', '#edikasyon'] },
      { name: 'Technology', description: 'Digital platforms and AI tools in service of civic life, democracy and innovation.', sdg: '9', tags: ['#opensource', '#teknoloji'] },
      { name: 'Human Rights', description: 'Defending civil and political rights, countering hate speech, and promoting an inclusive civic space.', sdg: '16', tags: ['#legaltech', '#jistis'] },
      { name: 'Youth', description: 'Supporting young talent through mentorship and opportunity to grow the next generation of builders.', sdg: '8', tags: ['#jènès', '#opòtinite'] },
      { name: 'Economic Development', description: 'Entrepreneurship, startup incubation and durable value creation for Haitian communities.', sdg: '8', tags: ['#antreprenarya', '#ekonomi'] },
      { name: 'Open Data', description: "Opening Haiti's public data to builders, researchers and institutions — democratic transparency starts with access.", sdg: '16/17', tags: ['#opendata', '#transparans'] },
    ],
  },
  journal: {
    label: 'The journal',
    strokeWord: 'News,',
    titleRest: 'stories & voices',
    subtitle: 'Explore our updates, field notes, and impact stories that move change forward.',
    readMore: 'Read article',
    viewAll: 'All articles',
    posts: [
      { category: 'Project', date: 'May 12, 2026', title: 'LexHaiti launches: access to law for everyone', image: '/blog/lexhaiti-hero.jpg' },
      { category: 'Community', date: 'Apr 28, 2026', title: 'Training the next generation of builders', image: '/blog/collaboration.webp' },
      { category: 'Ideas', date: 'Apr 9, 2026', title: 'Why open data matters for Haiti', image: '/blog/analytics.webp' },
    ],
  },
  faq: {
    label: 'FAQ',
    strokeWord: 'Your',
    titleRest: 'questions, answered.',
    subtitle: 'Everything you need to know about supporting, contributing to, and joining the hub.',
    items: [
      { q: "What is Ayiti Dijital's mission?", a: 'We incubate and launch digital public goods that serve the public interest, in order to democratize access to information and opportunity in Haiti.' },
      { q: 'How are donations used?', a: 'Every contribution directly funds project development, training programs, and the open infrastructure we make available to all.' },
      { q: 'Can I volunteer?', a: "Yes. Developers, lawyers, designers, or engaged citizens — there's a place for everyone, on GitHub and in our programs." },
      { q: 'Beyond donating, how can I help?', a: 'Share our projects, join the community, propose an idea, or become an institutional partner of the hub.' },
      { q: 'How do I become a partner?', a: 'Reach out via the Contact page: we build the ecosystem with institutions, universities, and organizations aligned with our values.' },
    ],
  },
  action: {
    label: 'Take action',
    title: "Build Haiti's digital backbone.",
    subtitle: 'Two ways to move the mission forward — pick yours.',
    fundKreyol: 'PATNÈ',
    fundTitle: 'Fund a project',
    fundDesc: 'Organisations, funders, diaspora: your support turns civic-tech prototypes into lasting public infrastructure.',
    fundButton: 'Become a partner',
    codeKreyol: 'KÒDE',
    codeTitle: 'Contribute code',
    codeDesc: "Developer, designer, jurist, or translator: every project in the hub is open and auditable, and it's waiting for you.",
    codeButton: 'Join the community',
  },
  footerBlurb: 'Free, open digital infrastructure for Haiti and its diaspora — laws, archives, skills and open-source tools.',
  newsletter: {
    kicker: 'Newsletter',
    title: 'Monthly updates',
    body: 'Stay connected to the Ayiti Dijital network — news, events and startups taking off. A dose of creative digital culture, straight to your inbox.',
    privacy: { label: 'Privacy policy', href: '/konfidansyalite' },
    firstName: { label: 'First name', placeholder: 'Ada' },
    lastName: { label: 'Last name', placeholder: 'Lovelace' },
    email: { label: 'Email', placeholder: 'ada.lovelace@email.com' },
    consent: 'I consent to the processing of my personal data for the purpose of sending the newsletter.',
    button: 'Yes, subscribe',
    confirm: 'Thanks! We’ll get back to you shortly.',
  },
  footerColumns: [
    {
      heading: 'About',
      links: [
        { label: 'Vision & mission', href: '/sou-nou#vizyon' },
        { label: 'Our principles', href: '/sou-nou#prensip' },
        { label: 'Team', href: '/sou-nou#ekip' },
        // { label: 'Careers', href: '/sou-nou#karye' }, // TODO: re-enable when the Careers page is ready
      ],
    },
    {
      heading: 'Ecosystem',
      links: [
        { label: 'Donate', href: '/soutni' },
        { label: 'Join the community', href: '/kominote' },
        { label: 'Contact', href: 'mailto:contact@ayitidijital.org' },
      ],
    },
    {
      heading: 'Themes',
      links: [
        { label: 'Digitalization & AI', href: '/#domenn' },
        { label: 'Sustainability', href: '/#domenn' },
        { label: 'Entrepreneurship', href: '/#domenn' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Legal notice', href: '/enfomasyon-legal' },
        { label: 'Privacy', href: '/konfidansyalite' },
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
      { label: 'Legal notice', href: '/enfomasyon-legal' },
      { label: 'Privacy', href: '/konfidansyalite' },
    ],
    luckyText: 'Ready to build?',
    ctaLead: 'Tech moves fast.',
    ctaStrong: "Let's build it together.",
    proverb: 'Men anpil chay pa lou.',
  },
  metaTitle: 'Ayiti Dijital — The conch sounds, the digital konbit begins',
  metaDescription:
    'Ayiti Dijital is building free, open digital infrastructure for Haiti and its diaspora: laws, archives, training and open-source tools.',
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

const CONTENT: Record<Locale, SiteContent> = { ht, fr, en }

/** Returns the fully-typed site copy for a given locale. */
export function getSiteContent(locale: Locale): SiteContent {
  return CONTENT[locale]
}
