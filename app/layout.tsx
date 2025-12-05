import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Easy Test App',
  description: 'Next.js App Router application',
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

