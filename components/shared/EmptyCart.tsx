import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRTLAwareStyle } from '@/util/rtl'

export default function EmptyCart() {
  const t = useTranslations('checkout')
  const rtlDirection = useRTLAwareStyle('', 'rotate-180 mr-2')

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center max-w-md">
        <div className="bg-primary/10 rounded-full p-3 w-16 h-16 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('emptyCartTitle')}</h1>
        <p className="text-muted-foreground mb-8">
          {t('emptyCartDescription')}
        </p>
        <Button asChild>
          <Link href="/products" className="inline-flex items-center">
            {t('continueShopping')}
            <ArrowRight className={`${rtlDirection} ml-2 h-4 w-4`} />
          </Link>
        </Button>
      </div>
    </div>
  )
}