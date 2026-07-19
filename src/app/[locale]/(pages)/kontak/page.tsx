import { Mail, MapPin, Scale } from 'lucide-react'
import { RoutePage } from '@/components/pages/RoutePage'
import { ContactForm } from '@/components/sections/ContactForm'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Kontak" — split panel: the channels on a sand ground, the form on white,
 * inside one rounded card so the split reads as this site's material rather
 * than a full-bleed band.
 *
 * There is no phone row. The reference layout has one; we do not have a number,
 * none has ever been supplied, and this page sits beside the statutory pages
 * where an invented one would be worst. The form still offers a phone FIELD —
 * that number belongs to the visitor, not to us.
 *
 * The submit is navy, not red: the navbar carries a red "Soutni" on every page
 * and red here is one-per-view.
 *
 * The form POSTs to NEXT_PUBLIC_CONTACT_ENDPOINT when configured, and otherwise
 * opens a pre-filled message in the visitor's own mail client. Those are
 * different outcomes and the confirmation says which happened.
 */
const EMAIL = 'contact@ayitidijital.org'
const POST = ['Ayiti Dijital', 'Ursberger Str. 15', '81673 München', 'Deutschland']

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/kontak', locale, getSiteContent(toLocale(locale)).contactPage.label)
}

export default async function KontakPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getSiteContent(toLocale(locale))
  const k = c.contactPage

  const privacyHref = `/${locale}/konfidansyalite`
  const imprintLabel =
    c.footerColumns.flatMap((col) => col.links).find((l) => l.href.includes('enfomasyon-legal'))?.label ?? 'Impressum'

  return (
    <RoutePage content={c} path="/kontak" title={k.label} subtitle={k.lead}>
      <section className="bg-white px-2 py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid overflow-hidden rounded-feature lg:grid-cols-[0.9fr_1.1fr]">
            {/* ── Channels ─────────────────────────────────────────────── */}
            <div className="bg-sand p-8 md:p-12 lg:p-14">
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-primary">
                {k.label}
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">{k.lead}</p>

              <ul className="mt-10 flex flex-col gap-7">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.emailLabel}
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 block break-all font-display font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.postLabel}
                    </p>
                    <address className="mt-1 not-italic leading-relaxed text-ink">
                      {POST.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_10px_30px_-18px_rgba(10,58,96,0.5)]">
                    <Scale className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/70">
                      {k.legalLabel}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                      <a
                        href={`/${locale}/enfomasyon-legal`}
                        className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                      >
                        {imprintLabel}
                      </a>
                      <a
                        href={privacyHref}
                        className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                      >
                        {c.newsletter.privacy.label}
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* ── Form ─────────────────────────────────────────────────── */}
            <div className="border border-black/[0.07] bg-white p-8 md:p-12 lg:border-l-0 lg:p-14">
              <ContactForm
                copy={k}
                privacyHref={privacyHref}
                privacyLabel={c.newsletter.privacy.label}
              />
            </div>
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
