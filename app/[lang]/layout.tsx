import { Providers } from '../providers';
import { getTranslations } from 'next-intl/server';
import MainLayout from '@/components/layout/MainLayout'
import '../globals.css'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs'

import { Roboto } from 'next/font/google'


const roboto = Roboto({
  weight: ['400', '700','300','500',],
  subsets: ['latin'],
  display: 'swap',
  variable:'--roboto'
})

const fancyCut = localFont({
  src: '../../public/fonts/brolachess.ttf',
  variable: '--fancy',
})

const brilliantCut = localFont({
  src: '../../public/fonts/Brilliant Cut Pro.ttf',
  variable: '--brilliant',
})

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
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
  };

  const clerkPubkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider publishableKey={clerkPubkey}>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`${fancyCut.variable} ${brilliantCut.variable} ${roboto.variable}`}>
        <body className=''>
          <Providers locale={lang} messages={messages}>
            <MainLayout>
              <Toaster />
              {children}
            </MainLayout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}