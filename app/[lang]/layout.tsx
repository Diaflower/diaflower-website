import {Providers} from '../providers';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {lang}}: {params: {lang: string}}) {
  const t = await getTranslations({locale: lang, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params: {lang}
}: {
  children: React.ReactNode;
  params: {lang: string};
}) {
  const messages = (await import(`../../public/locales/${lang}.json`)).default;

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Providers locale={lang} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}