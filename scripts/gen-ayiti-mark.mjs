// Generates src/components/brand/ayitiMarkSvg.ts from public/logos/ayiti/ayiti-dijital-mark.svg
// (the Illustrator export of the Ayiti Dijital mark). Run after the logo changes:
//
//     node scripts/gen-ayiti-mark.mjs
//
// Each shape gets a role class (ad-outline, ad-ring, ad-ridge, ad-ray, ad-trace, ad-node, ad-core),
// colours come from CSS variables, and timing comes from per-element custom properties read by
// src/styles/ayiti-logo.css:
//   --d  intro delay (ms)       --l  loop/hover delay (ms, top to bottom through the circuit)
// Every circuit trace also gets an ad-spark twin: the travelling "current".
import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'public/logos/ayiti/ayiti-dijital-mark.svg'
const OUT = 'src/components/brand/ayitiMarkSvg.ts'

const svg = readFileSync(SRC, 'utf8')
const viewBox = svg.match(/viewBox="([^"]+)"/)[1]
const [, , VW] = viewBox.split(/\s+/).map(Number)

// content of a top-level layer group (layers are siblings; Outline holds empty leftover groups)
function layer(id) {
  const start = svg.indexOf(`<g id="${id}">`)
  if (start < 0) return ''
  const rest = svg.slice(start + `<g id="${id}">`.length)
  const next = rest.search(/\n<g id="/)
  return next < 0 ? rest : rest.slice(0, next)
}

const SHAPE = /<(path|line|polyline|polygon|circle)\b([\s\S]*?)\/>/g
const attr = (s, name) => { const m = s.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? m[1] : null }
const styleOf = s => Object.fromEntries((attr(s, 'style') || '').split(';').filter(Boolean).map(kv => kv.split(':').map(x => x.trim())))
const r1 = s => s.replace(/-?\d+\.\d+/g, n => String(Math.round(parseFloat(n) * 10) / 10))
const clean = s => r1(s.replace(/\s+/g, ' ').trim())

function shapes(id) {
  const out = []
  for (const m of layer(id).matchAll(SHAPE)) {
    const [, tag, rest] = m
    const st = styleOf(rest)
    let pts = []
    if (tag === 'line') pts = [[+attr(rest, 'x1'), +attr(rest, 'y1')], [+attr(rest, 'x2'), +attr(rest, 'y2')]]
    else if (tag === 'polyline' || tag === 'polygon') {
      const n = attr(rest, 'points').trim().split(/[\s,]+/).map(Number)
      for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]])
    } else if (tag === 'circle') { const cx = +attr(rest, 'cx'), cy = +attr(rest, 'cy'), r = +attr(rest, 'r'); pts = [[cx - r, cy - r], [cx + r, cy + r]] }
    else { const mm = (attr(rest, 'd') || '').match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/); if (mm) pts = [[+mm[1], +mm[2]]] }
    const ys = pts.map(p => p[1]), xs = pts.map(p => p[0])
    const geo = ['d', 'points', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r']
      .map(a => attr(rest, a) !== null ? `${a}="${clean(attr(rest, a))}"` : '').filter(Boolean).join(' ')
    out.push({ tag, geo, st, y: Math.min(...ys), x: (Math.min(...xs) + Math.max(...xs)) / 2,
      evenodd: st['fill-rule'] === 'evenodd',
      filled: !!st.fill && st.fill !== 'none', stroked: !!st.stroke && st.stroke !== 'none',
      sw: parseFloat(st['stroke-width'] || '0') })
  }
  return out
}

// ---- roles -------------------------------------------------------------
const emblem = shapes('Emblem').filter(s => s.stroked)
const rings = emblem.filter(s => s.tag === 'path')
const ridges = emblem.filter(s => s.tag === 'polyline')
const rays = emblem.filter(s => s.tag === 'line')
const outline = shapes('Outline')
const circuit = shapes('Circuit')
const traces = circuit.filter(s => !s.filled && s.stroked)
const nodes = circuit.filter(s => s.filled && s.stroked)
const core = circuit.filter(s => s.filled && !s.stroked)

const ys = circuit.map(s => s.y), Y0 = Math.min(...ys), Y1 = Math.max(...ys)
const frac = y => (y - Y0) / ((Y1 - Y0) || 1)

// intro timing (ms), from the approved prototype: outline → rings → ridges → rays → circuit → core
const T = { outline: 0, ring: 455, ringStep: 98, ridge: 840, ray: 1085, rayStep: 28, trace: 1295, traceSpan: 840, nodeLag: 224, core: 2135 }
const loopAt = y => Math.round(650 * frac(y))

const el = (s, cls, vars, extra = '') =>
  `<${s.tag} class="${cls}" ${s.geo}${s.evenodd ? ' fill-rule="evenodd"' : ''} stroke-width="${s.sw || 0}"${extra} style="${Object.entries(vars).map(([k, v]) => `--${k}:${v}`).join(';')}"/>`

const parts = []
rings.forEach((s, i) => parts.push(el(s, 'ad-draw ad-ring', { d: T.ring + i * T.ringStep }, ' pathLength="1"')))
ridges.forEach(s => parts.push(el(s, 'ad-draw ad-ridge', { d: T.ridge }, ' pathLength="1"')))
rays.slice().sort((a, b) => Math.abs(a.x - VW / 2) - Math.abs(b.x - VW / 2))
  .forEach((s, i) => parts.push(el(s, 'ad-draw ad-ray', { d: T.ray + i * T.rayStep }, ' pathLength="1"')))
traces.forEach(s => {
  const d = Math.round(T.trace + T.traceSpan * frac(s.y)), l = loopAt(s.y)
  parts.push(el(s, 'ad-draw ad-trace', { d, l }, ' pathLength="1"'))
  parts.push(el(s, 'ad-spark', { d, l }, ' pathLength="1"'))
})
nodes.forEach(s => parts.push(el(s, 'ad-node', { d: Math.round(T.trace + T.traceSpan * frac(s.y) + T.nodeLag), l: loopAt(s.y) + 400 })))
core.forEach(s => parts.push(el(s, 'ad-core', { d: T.core, l: 0 })))
// the A's outline goes last, so it sits on top: every blue line ends cleanly under the white (or navy) A
outline.forEach(s => parts.push(el(s, 'ad-draw ad-outline', { d: T.outline }, ' pathLength="1"')))

const markup = parts.join('')
const ts = `// Auto-generated by scripts/gen-ayiti-mark.mjs from ${SRC} — do not edit by hand.
// Roles (class), timing (--d intro delay, --l loop delay, in ms) and colours are read by
// src/styles/ayiti-logo.css.
export const AYITI_MARK_VIEWBOX = '${viewBox.split(/\s+/).map(n => Math.round(+n * 10) / 10).join(' ')}'
export const AYITI_MARK_SVG = ${JSON.stringify(markup)}
`
writeFileSync(OUT, ts)
console.log(`wrote ${OUT}: ${outline.length} outline, ${rings.length} rings, ${ridges.length} ridges, ${rays.length} rays, ${traces.length} traces (+sparks), ${nodes.length} nodes, ${core.length} core; ${Math.round(markup.length / 1024)} KB`)
