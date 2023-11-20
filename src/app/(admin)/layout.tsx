import "./adminGlobals.scss"
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  favicon: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
