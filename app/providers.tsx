'use client';

import {NextIntlClientProvider} from 'next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({children, locale, messages}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {

  const [queryClient] = useState(() => new QueryClient())

  return (

    <QueryClientProvider client={queryClient}>
    <NextIntlClientProvider timeZone='Asia/Dubai' locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
    </QueryClientProvider>
  );
}