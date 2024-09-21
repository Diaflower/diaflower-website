// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: {
    common: (await import(`./public/locales/${locale}/common.json`)).default,
    home: (await import(`./public/locales/${locale}/home.json`)).default,
    metadata: (await import(`./public/locales/${locale}/metadata.json`)).default,
    contact: (await import(`./public/locales/${locale}/contact.json`)).default,
    account: (await import(`./public/locales/${locale}/account.json`)).default,
    checkout: (await import(`./public/locales/${locale}/checkout.json`)).default,
    cart: (await import(`./public/locales/${locale}/cart.json`)).default,
    categories: (await import(`./public/locales/${locale}/categories.json`)).default,
    product: (await import(`./public/locales/${locale}/product.json`)).default,
    // Add other namespaces as needed
  },
  // timeZone: 'Asia/Dubai', // Dubai's time zone
}));