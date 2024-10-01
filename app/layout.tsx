import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  const clerkPubkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <html>
      <body>
        <ClerkProvider publishableKey={clerkPubkey}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}