import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: ReactNode }) {
  const clerkPubkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <html>
      <body>
      <GoogleAnalytics gaId="G-22RDMDJBN1" />
        <ClerkProvider publishableKey={clerkPubkey}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}