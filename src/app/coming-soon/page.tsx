import type { CSSProperties } from 'react'

/**
 * The public face of ayitidijital.org while the site is finished — served at
 * every URL by the gate in `src/proxy.ts`.
 *
 * A single centred lockup on the hero's dark navy ground: the lanbi mark over
 * the wordmark, and one "under construction" line. Quiet, pure-CSS polish — a
 * breathing glow behind the mark, film grain, slowly drifting ambient orbs, a
 * staggered entrance — all disabled under `prefers-reduced-motion`. No client JS.
 */

const STYLE = `
@keyframes cs-rise { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
@keyframes cs-glow { 0%, 100% { opacity: .42; transform: scale(1) } 50% { opacity: .8; transform: scale(1.07) } }
@keyframes cs-pulse { 0%, 100% { opacity: .3; transform: scale(.78) } 50% { opacity: 1; transform: scale(1) } }
@keyframes cs-drift-a { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(4%, -3%) } }
@keyframes cs-drift-b { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(-4%, 3%) } }

.cs-rise { opacity: 0; animation: cs-rise .9s cubic-bezier(.16, 1, .3, 1) both; animation-delay: var(--d, 0ms) }

.cs-mark { position: relative; display: grid; place-items: center }
.cs-mark::before {
  content: ""; position: absolute; inset: -38%; border-radius: 9999px; z-index: -1;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-gold) 26%, transparent) 0%, transparent 68%);
  filter: blur(26px); animation: cs-glow 5.5s ease-in-out infinite;
}

.cs-dot {
  width: 7px; height: 7px; border-radius: 9999px; background: var(--color-gold); flex: none;
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-gold) 75%, transparent);
  animation: cs-pulse 2.6s ease-in-out infinite;
}

.cs-grain {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
}

.cs-orb { position: absolute; z-index: 0; pointer-events: none; border-radius: 9999px; filter: blur(64px) }
.cs-orb--gold {
  left: -12rem; top: -12rem; width: 36rem; height: 36rem;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-gold) 13%, transparent) 0%, transparent 70%);
  animation: cs-drift-a 20s ease-in-out infinite;
}
.cs-orb--blue {
  right: -9rem; bottom: -11rem; width: 32rem; height: 32rem;
  background: radial-gradient(circle, color-mix(in srgb, var(--lanbi-blue-ondark) 17%, transparent) 0%, transparent 70%);
  animation: cs-drift-b 26s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cs-rise, .cs-mark::before, .cs-dot, .cs-orb { animation: none }
  .cs-rise { opacity: 1; transform: none }
}
`

export default function ComingSoonPage() {
  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          'radial-gradient(125% 85% at 50% -10%, color-mix(in srgb, var(--color-primary) 32%, transparent) 0%, transparent 56%), #0a0a0f',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      <div aria-hidden="true" className="cs-grain" />
      <span aria-hidden="true" className="cs-orb cs-orb--gold" />
      <span aria-hidden="true" className="cs-orb cs-orb--blue" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="cs-mark cs-rise" style={{ '--d': '0ms' } as CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="" width={80} height={80} className="h-20 w-20" />
        </div>

        <h1
          className="cs-rise mt-7 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          style={{ '--d': '110ms' } as CSSProperties}
        >
          Ayiti Dijital
        </h1>

        <p
          className="cs-rise mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[color:var(--color-gold)] sm:text-sm"
          style={{ '--d': '220ms' } as CSSProperties}
        >
          <span className="cs-dot" aria-hidden="true" />
          En construction · Coming soon
        </p>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-10 py-7 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">© 2026 Ayiti Dijital</span>
      </footer>
    </main>
  )
}
