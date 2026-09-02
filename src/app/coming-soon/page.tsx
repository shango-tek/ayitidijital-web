/**
 * The public face of ayitidijital.org while the site is finished — served at
 * every URL by the gate in `src/proxy.ts`.
 *
 * Deliberately bare: the wordmark and a single "under construction" line, on the
 * hero's dark navy ground with its top wash and ambient orbs. No client JS.
 *
 * The footer links to the imprint and privacy policy, which the gate keeps
 * reachable — that is also what keeps the statutory imprint available while the
 * rest of the site is gated.
 */
export default function ComingSoonPage() {
  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          'radial-gradient(125% 85% at 50% -10%, color-mix(in srgb, var(--color-primary) 30%, transparent) 0%, transparent 58%), #0a0a0f',
      }}
    >
      {/* ambient orbs — the hero's gold + navy wash, blurred */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-gold) 12%, transparent) 0%, transparent 70%)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--lanbi-blue-ondark) 16%, transparent) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* wordmark */}
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="" width={56} height={56} className="h-14 w-14" />
          <span className="font-display text-3xl font-bold tracking-tight text-white">Ayiti Dijital</span>
        </div>

        {/* the only message */}
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.34em] text-[color:var(--color-gold)] sm:text-sm">
          En construction · Coming soon
        </p>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">© 2026 Ayiti Dijital</span>
        <nav className="flex gap-5">
          <a href="/fr/enfomasyon-legal" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70">
            Mentions légales
          </a>
          <a href="/fr/konfidansyalite" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70">
            Confidentialité
          </a>
        </nav>
      </footer>
    </main>
  )
}
