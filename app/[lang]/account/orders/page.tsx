import { getTranslations } from 'next-intl/server'
import OrdersList from '@/components/account/OrderList'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('ordersPageTitle'),
    description: t('ordersPageDescription'),
  };
}

export default async function OrdersPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations('account')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('myOrders')}</h1>
      <p className="text-muted-foreground">
        {t('ordersPageIntro')}
      </p>
      <OrdersList lang={lang} />
    </div>
  )
}