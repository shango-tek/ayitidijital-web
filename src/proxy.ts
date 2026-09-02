import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * "Coming soon" gate.
 *
 * While the site is unfinished, every public request is rewritten to
 * `/coming-soon`. The URL is preserved (a rewrite, not a redirect), so the real
 * pages stay deployed and instantly revealable — nothing here is destructive.
 *
 * Runs as an Edge Proxy (Next 16's renamed Middleware), i.e. at Vercel's edge.
 *
 * PRODUCTION ONLY. The gate is active solely on the Vercel production
 * deployment (`VERCEL_ENV === 'production'`). Local `next dev`, local builds and
 * Vercel preview deployments all show the real site untouched — so the site is
 * fully workable locally with nothing to bypass.
 *
 * Two more controls, for production:
 *   • Private preview — open any page with `?preview=<token>` once. It drops a
 *     cookie and lets you (and only you) see the real production site while the
 *     public sees the holding page. Token defaults below; override with the
 *     COMING_SOON_TOKEN env var.
 *   • Go live — set `COMING_SOON=off` in the production environment (Vercel →
 *     redeploy) or delete this file. Either reveals the whole site.
 */

const TOKEN = process.env.COMING_SOON_TOKEN ?? 'lanbi-6f3a91'

/* Active only on Vercel's production deployment, and only until switched off.
   Undefined VERCEL_ENV (local dev / local build) → never gated. */
const GATED = process.env.VERCEL_ENV === 'production' && process.env.COMING_SOON !== 'off'

/* Reachable even while gated: the holding page itself, and the two statutory
   documents (§ 5 DDG imprint, GDPR privacy) plus the legacy URLs that 308 to
   them. An association's imprint must stay reachable, and the holding page
   links to both. */
const ALLOW =
  /^\/(?:coming-soon|(?:ht|fr|en)\/(?:enfomasyon-legal|konfidansyalite)|mentions-legales|confidentialite|en\/(?:imprint|privacy))(?:\/|$)/

export function proxy(request: NextRequest) {
  // Off everywhere but Vercel production (and there, until COMING_SOON=off).
  if (!GATED) return NextResponse.next()

  const { pathname, searchParams } = request.nextUrl

  // ?preview=<token> → set the cookie, strip the param, let this request through.
  if (searchParams.get('preview') === TOKEN) {
    const url = request.nextUrl.clone()
    url.searchParams.delete('preview')
    const res = NextResponse.redirect(url)
    res.cookies.set('ad-preview', TOKEN, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    return res
  }
  if (request.cookies.get('ad-preview')?.value === TOKEN) return NextResponse.next()

  if (ALLOW.test(pathname)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/coming-soon'
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except Next's own assets and static files (which must serve so
  // the holding page can render). Paths with no extension — the real routes —
  // all flow through the gate.
  matcher: [
    '/((?!_next/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest|woff|woff2|ttf|otf|mp4)$).*)',
  ],
}
