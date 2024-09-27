'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import PageTransition from '../shared/PageTransition'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Header />
      <PageTransition>
        <main key={pathname} className=''>
          {children}
        </main>
      </PageTransition>
      <Footer />
    </>
  )
}