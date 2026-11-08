import { Mail, MapPin, Scale } from 'lucide-react'
import { RoutePage } from '@/components/pages/RoutePage'
import { ContactForm } from '@/components/sections/ContactForm'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Kontak" — split panel: the channels on a lavender ground, the form on white,
 * in the house register (Albert Sans, electric accents, sharp edges).
 *
 * There is no phone row (no number has ever been supplied); the form still
 * offers a phone FIELD, which belongs to the visitor, not to us. The form POSTs
 * to NEXT_PUBLIC_CONTACT_ENDPOINT when configured, otherwise opens a pre-filled
 * message in the visitor's own mail client — the confirmation says which.
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
    <RoutePage content={c} path="/kontak" title={c.pageTitles.contact} subtitle={k.lead}>
      <section className="bg-tum-paper px-2 py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid overflow-hidden border-4 border-double border-tum-ink lg:grid-cols-[0.9fr_1.1fr]">
            {/* ── Channels ─────────────────────────────────────────────── */}
            <div className="bg-lavender p-8 md:p-12 lg:p-14">
              <h2 className="font-tum text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight tracking-tight text-tum-ink">
                {k.label}
              </h2>
              <p className="mt-4 max-w-sm font-tum leading-relaxed text-tum-muted">{k.lead}</p>

              <ul className="mt-10 flex flex-col gap-7">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-electric text-white">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-tum text-[11px] font-bold uppercase tracking-[0.16em] text-tum-muted">
                      {k.emailLabel}
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 block break-all font-tum font-bold text-electric underline decoration-electric/40 underline-offset-4 transition-colors hover:text-electric-bright"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-electric text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-tum text-[11px] font-bold uppercase tracking-[0.16em] text-tum-muted">
                      {k.postLabel}
                    </p>
                    <address className="mt-1 not-italic font-tum leading-relaxed text-tum-ink">
                      {POST.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-electric text-white">
                    <Scale className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-tum text-[11px] font-bold uppercase tracking-[0.16em] text-tum-muted">
                      {k.legalLabel}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                      <a
                        href={`/${locale}/enfomasyon-legal`}
                        className="font-tum text-sm font-bold text-electric underline decoration-electric/40 underline-offset-4 transition-colors hover:text-electric-bright"
                      >
                        {imprintLabel}
                      </a>
                      <a
                        href={privacyHref}
                        className="font-tum text-sm font-bold text-electric underline decoration-electric/40 underline-offset-4 transition-colors hover:text-electric-bright"
                      >
                        {c.newsletter.privacy.label}
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* ── Form ─────────────────────────────────────────────────── */}
            <div className="bg-tum-paper p-8 md:p-12 lg:p-14">
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
