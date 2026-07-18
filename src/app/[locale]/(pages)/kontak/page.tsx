'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/**
 * "Kontak" — the page the FAQ has been promising in all three languages
 * ("écrivez-nous via la page Contact") while the footer only ever offered a
 * mailto:. Now it exists, and the footer points here.
 *
 * Every channel on this page is one we actually have. There is no phone number
 * and no contact form: no number has been supplied, and a form would need a
 * backend, a privacy basis and a consent flow that do not exist yet — a form
 * that silently drops messages is worse than an honest mailto.
 */
const EMAIL = 'contact@ayitidijital.org'
const POST = ['Ayiti Dijital', 'Ursberger Str. 15', '81673 München', 'Deutschland']

export default function KontakPage() {
  const { content: c, locale } = useLocale()
  const k = c.contactPage

  return (
    <RoutePage path="/kontak" subtitle={k.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
            {k.label}
          </span>

          <div className="mt-10 grid gap-4 lg:mt-14 lg:max-w-5xl lg:grid-cols-3">
            {/* Email — the one channel that reaches a person, so it leads and it
                is the only filled card. */}
            <article className="rounded-card bg-primary p-8 lg:col-span-2">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                {k.emailLabel}
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 inline-block font-display text-[clamp(1.4rem,3.2vw,2.1rem)] font-extrabold leading-tight tracking-tight text-white underline decoration-gold/40 underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                {EMAIL}
              </a>
            </article>

            <article className="rounded-card border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.postLabel}
              </h2>
              <address className="mt-4 not-italic leading-relaxed text-ink-soft">
                {POST.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </article>
          </div>

          <div className="mt-4 lg:max-w-5xl">
            <article className="rounded-card bg-sand p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
                {k.legalLabel}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{k.legalBody}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={`/${locale}/enfomasyon-legal`}
                  className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                >
                  {c.footerColumns.flatMap((col) => col.links).find((l) => l.href.includes('enfomasyon-legal'))?.label ?? 'Impressum'}
                </a>
                <a
                  href={`/${locale}/konfidansyalite`}
                  className="font-display text-sm font-bold text-primary underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:text-gold-deep"
                >
                  {c.newsletter.privacy.label}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
