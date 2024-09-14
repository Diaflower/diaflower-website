import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CartPageContent from '@/components/cart/CartPageContent'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('cartPageTitle'),
    description: t('cartPageDescription'),
  }
}

export default function CartPage() {
  return <CartPageContent />
}