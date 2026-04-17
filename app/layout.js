import { DM_Sans, DM_Serif_Display, Courgette } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-courgette',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata = {
  title: 'Randy Dawn Tai — Product Designer',
  description: 'Product Designer based in Bangkok',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${courgette.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
