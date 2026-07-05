/**
 * Root layout is intentionally a pure pass-through: the real
 * <html>/<body>, fonts, preloader and metadata live in
 * `src/app/[locale]/layout.tsx` so they can be locale-aware
 * (`<html lang>` + per-locale metadata). Next.js still requires a root
 * layout to exist, so this one just forwards its children.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
