import type { APIRoute } from 'astro';

/**
 * Membership application intake endpoint — PLACEHOLDER.
 *
 * The site currently ships as static HTML, so this file is built only as
 * a prerendered GET handler that always returns { ok: true }. The form
 * client posts here, but on a static host the POST returns 405 — the
 * form code swallows that and still shows the success state.
 *
 * TODO: when moving to SSR (install @astrojs/node / @astrojs/vercel etc.),
 *       set `prerender = false` and add the POST handler that:
 *         1. Validates payload (zod / valibot).
 *         2. Persists to Airtable or Notion.
 *         3. Sends notification email via Resend to kontakt@ayitidijital.org.
 *         4. Confirms receipt to the applicant in their language.
 */
export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ ok: true, placeholder: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
