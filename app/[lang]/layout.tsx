import { ReactNode } from 'react'
import { Providers } from '../providers'
import { getTranslations } from 'next-intl/server'
import MainLayout from '@/components/layout/MainLayout'
import { Toaster } from '@/components/ui/toaster'

import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

const roboto = Roboto({
  weight: ['400', '700', '300', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--roboto'
})

const fancyCut = localFont({
  src: '../../public/fonts/brolachess.ttf',
  variable: '--fancy',
})

const arabicHeading = localFont({
  src: '../../public/fonts/arabic-heading.ttf',
  variable: '--arabic-heading',
})

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params: { lang }
}: {
  children: ReactNode
  params: { lang: string }
}) {
  const messages = {
    common: (await import(`../../public/locales/${lang}/common.json`)).default,
    home: (await import(`../../public/locales/${lang}/home.json`)).default,
    metadata: (await import(`../../public/locales/${lang}/metadata.json`)).default,
    contact: (await import(`../../public/locales/${lang}/contact.json`)).default,
    account: (await import(`../../public/locales/${lang}/account.json`)).default,
    checkout: (await import(`../../public/locales/${lang}/checkout.json`)).default,
    cart: (await import(`../../public/locales/${lang}/cart.json`)).default,
    categories: (await import(`../../public/locales/${lang}/categories.json`)).default,
    product: (await import(`../../public/locales/${lang}/product.json`)).default,
    terms: (await import(`../../public/locales/${lang}/terms.json`)).default,
  }

  return (
    <Providers locale={lang} messages={messages}>
      <div className={`${fancyCut.variable} ${roboto.variable} ${arabicHeading.variable}`} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <MainLayout>
          <Toaster />
          {children}
        </MainLayout>
      </div>
    </Providers>
  )
}