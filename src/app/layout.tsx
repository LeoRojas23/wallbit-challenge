'use cache'

import type { Metadata } from 'next'

import { Geist } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Wallbit Challenge',
  description: 'Wallbit Challenge is a shopping cart app built with Next.js and Drizzle ORM.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.className} dark m-auto h-full min-h-screen w-full max-w-5xl antialiased`}
      >
        <main className='py-8'>
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
