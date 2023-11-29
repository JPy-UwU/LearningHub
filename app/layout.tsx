import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'

import ToasterProvider from '@/components/provider/toaster-provider'
import { ConfettiProvider } from '@/components/provider/confetti-provider'
import { CrispProvider } from '@/components/provider/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Hub',
  description: 'Learn with Everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" type="image/png" href="/logo.png" />
        <CrispProvider />
        <body className={inter.className}>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
