'use client'

import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CartSummary() {
  const { getTotalPrice, getTotalItems } = useCartStore()
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatPrice = (price: number) => t('currency', { amount: price.toFixed(2) })

  const subtotal = getTotalPrice()
  const shipping = 0
  const taxes = subtotal * 0.05
  const total = subtotal + shipping

  if (!isClient) {
    return <div>Loading...</div> // or return null
  }

  if (getTotalItems() === 0) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className={`text-2xl font-bold mb-4 ${letterSpacing}`}>{t('summary')}</h2>
      <div className={`space-y-2 mt-4 ${rtlAlign}`}>
        <div className="flex justify-between">
          <span>{t('subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('shipping')}</span>
          <span>{shipping === 0 ? t('calculatedAtNextStep') : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('taxes')}</span>
          <span>{formatPrice(taxes)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>{t('total')}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <Button className="w-full mt-6 bg-gray-900 text-white hover:bg-gray-800">
        <Link href={'/checkout'} className={`${letterSpacing}`}>
        {t('goToCheckout')}
        </Link>
      </Button>
    </div>
  )
}