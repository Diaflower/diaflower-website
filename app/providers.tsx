'use client';

import {NextIntlClientProvider} from 'next-intl';

export function Providers({children, locale, messages}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider timeZone='Asia/Dubai' locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}