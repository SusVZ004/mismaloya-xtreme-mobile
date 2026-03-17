import type { Metadata, Viewport } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const _poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'Mismaloya Xtreme - Tours y Experiencias',
  description: 'Descubre las mejores experiencias turisticas en Mismaloya, Puerto Vallarta. Tours de bioluminiscencia, snorkel, avistamiento de ballenas y mas.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#01313E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
