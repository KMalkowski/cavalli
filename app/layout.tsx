import { Poppins } from 'next/font/google'
import './globals.css'
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server'
import { ConvexClientProvider } from '@/components/ConvexClientProvider'
import { Suspense } from 'react'
import ChildrenWrapper from './children-wrapper'
import { baseUrl } from '@/lib/utils'
import { Toaster } from 'sonner'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Cavalli',
    template: `%s | Cavalli`,
  },
  robots: {
    follow: true,
    index: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="pl">
        <body className={`${poppins.variable} antialiased`}>
          <ConvexClientProvider>
            <NuqsAdapter>
              <Suspense fallback={null}>
                <ChildrenWrapper>{children}</ChildrenWrapper>
              </Suspense>
            </NuqsAdapter>
          </ConvexClientProvider>
          <Toaster />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
