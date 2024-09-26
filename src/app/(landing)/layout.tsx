import { Inter as FontSans } from 'next/font/google'

import Footer from '@/app/(landing)/components/footer'
import Header from '@/app/(landing)/components/header'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default async function LandingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <body
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <Toaster position='top-center' />
      <Providers attribute='class' defaultTheme='dark'>
        <Header />
        <main className='mx-auto flex-1 overflow-hidden'>{children}</main>
        <Footer />
      </Providers>
    </body>
  )
}
