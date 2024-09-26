import { Recursive } from 'next/font/google'

import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const recursive = Recursive({ subsets: ['latin'] })

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <body className={cn(recursive.className, 'antialiased')}>
      <Toaster position='top-center' />
      <Providers
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </Providers>
      <TailwindIndicator />
    </body>
  )
}
