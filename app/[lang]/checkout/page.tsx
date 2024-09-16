import { Metadata } from 'next'
import Checkout from '@/components/checkout/Checkout'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('checkoutPageTitle'),
    description: t('checkoutPageDescription'),
  }
}

export default function CheckoutPage() {
  return <Checkout />
}