'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

export function CartSummary() {
  const { getTotalPrice, getTotalItems } = useCartStore()
  const [discountCode, setDiscountCode] = useState('')
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')

  const formatPrice = (price: number) => t('currency', { amount: price.toFixed(2) })

  const subtotal = getTotalPrice()
  const shipping = 0 // You might want to calculate this based on your business logic
  const taxes = subtotal * 0.05 // 5% of subtotal, but not added to total
  const total = subtotal + shipping // Note: taxes are not included in the total

  const handleApplyDiscount = async () => {
    setIsApplying(true)
    setCouponError(null)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    // For demonstration, always show an error
    setCouponError(t('giftCardNotFound', { code: discountCode }))
    setIsApplying(false)
  }

  const toggleCouponInput = () => {
    setShowCouponInput(!showCouponInput)
    if (showCouponInput) {
      setDiscountCode('')
      setCouponError(null)
    }
  }

  if (getTotalItems() === 0) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{t('summary')}</h2>
      <Button
        variant="link"
        className="text-blue-600 p-0 h-auto font-normal"
        onClick={toggleCouponInput}
      >
        {showCouponInput ? t('hideGiftCard') : t('addGiftCard')}
      </Button>
      {showCouponInput && (
        <div className="mt-4">
          <div className="flex space-x-2 mb-2">
            <Input 
              placeholder={t('enterCode')}
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button onClick={handleApplyDiscount} disabled={isApplying}>
              {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : t('apply')}
            </Button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm">{couponError}</p>
          )}
        </div>
      )}
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
        {t('goToCheckout')}
      </Button>
    </div>
  )
}