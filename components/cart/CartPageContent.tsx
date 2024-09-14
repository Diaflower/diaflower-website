'use client'

import { useUser } from '@clerk/nextjs'
import { CartItems } from '@/components/cart/CartItems'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

export default function CartPageContent() {
  const { isSignedIn } = useUser()
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')

  return (
    <div className="container mx-auto p-4 md:p-8">
      {!isSignedIn && (
        <div className={`flex justify-between items-center mb-6 pb-4 border-b ${rtlAlign}`}>
          <div>
            <h2 className="text-lg font-semibold">{t('haveAccount')}</h2>
            <p className="text-sm text-gray-600">{t('signInForBetterExperience')}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/sign-in">{t('signIn')}</Link>
          </Button>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">{t('cart')}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CartItems />
        </div>
        <div className="lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}