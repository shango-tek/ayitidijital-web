import type { APIRoute } from 'astro';

/**
 * Contact form intake endpoint — PLACEHOLDER.
 *
 * Static-build placeholder: ships only a GET that always returns ok.
 * The form POST will 405 on a static host; the client swallows that
 * and shows the success state regardless.
 *
 * TODO: switch to SSR (install @astrojs/node / @astrojs/vercel),
 *       set `prerender = false`, and add a POST handler that:
 *         1. Validates payload.
 *         2. Sends notification email via Resend.
 *         3. (Optional) persists to Airtable / Notion.
 */
export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ ok: true, placeholder: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
