import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./public/locales/${locale}.json`)).default,
  // timeZone: 'Asia/Dubai', // Dubai's time zone
 
}));
