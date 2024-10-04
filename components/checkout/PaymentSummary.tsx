'use client'

import React, { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { CartContent } from '../shared/CartContent'
import { validateCoupon } from '@/data/coupons'
import { useAuth } from '@clerk/nextjs'

interface PaymentSummaryProps {
  emirate: string
  onCouponApplied: (code: string, discount: number) => void
  customerInfo: { name?: string; email?: string; phone?: string }
  onRequestCustomerInfo: () => void
}

export function PaymentSummary({ emirate, onCouponApplied, customerInfo, onRequestCustomerInfo }: PaymentSummaryProps) {
  const t = useTranslations('checkout')
  const { getTotalPrice } = useCartStore()
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')
  const { userId, isSignedIn } = useAuth()
  
  const subtotal = getTotalPrice()
  const tax = subtotal * 0.05 // 5% tax
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const total = subtotal + (shippingCost || 0) - couponDiscount

  const currencySymbol = t('currencySymbol')

  useEffect(() => {
    const calculateShipping = (emirate: string) => {
      if (!emirate) return null
      const freeShippingEmirates = ['dubai', 'sharjah', 'ajman']
      return freeShippingEmirates.includes(emirate.toLowerCase()) ? 0 : 150
    }
    setShippingCost(calculateShipping(emirate))
  }, [emirate])

  const formatCurrency = (amount: number) => {
    return currencySymbol === 'AED' 
      ? `${currencySymbol} ${amount.toFixed(2)}`
      : `${amount.toFixed(2)} ${currencySymbol}`
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) return

    if (!isSignedIn && (!customerInfo.name || !customerInfo.email || !customerInfo.phone)) {
      toast({
        title: t('additionalInfoRequired'),
        description: t('pleaseProvideInfoForCoupon'),
        duration: 5000,
      })
      onRequestCustomerInfo()
      return
    }

    setIsApplyingCoupon(true)

    try {
      const { isValid, discountAmount, message } = await validateCoupon({
        code: couponCode,
        subtotal,
        userId: userId || undefined,
        email: customerInfo.email,
        phone: customerInfo.phone
      })

      if (isValid) {
        setCouponDiscount(discountAmount)
        onCouponApplied(couponCode, discountAmount)
        toast({
          title: t('couponApplied'),
          description: t('couponDiscountApplied', { amount: formatCurrency(discountAmount) }),
          duration: 3000,
        })
      } else {
        setCouponDiscount(0)
        onCouponApplied('', 0)
        let errorMessage = t('invalidCoupon')
        if (message.includes('not valid for your account')) {
          errorMessage = t('couponNotValidForAccount')
        } else if (message.includes('not valid for your email')) {
          errorMessage = t('couponNotValidForEmail')
        } else if (message.includes('not valid for your phone number')) {
          errorMessage = t('couponNotValidForPhone')
        } else if (message === 'Expired coupon') {
          errorMessage = t('expiredCoupon')
        } else if (message === 'Coupon usage limit reached') {
          errorMessage = t('couponUsageLimitReached')
        }
        toast({
          title: t('invalidCoupon'),
          description: errorMessage,
          variant: "destructive",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error(t('errorApplyingCoupon'), error)
      toast({
        title: t('error'),
        description: t('couponErrorMessage'),
        variant: "destructive",
        duration: 3000,
      })
      setCouponDiscount(0)
      onCouponApplied('', 0)
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center cursor-pointer md:cursor-default" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className={`${letterSpacing}`}>{t('orderSummary')}</CardTitle>
        <Button variant="ghost" size="sm" className="md:hidden">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </CardHeader>

      <CardContent className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="space-y-4">
          <CartContent variant='summary' />
        </div>
        
        <Separator />
        
        <div>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-normal text-primary"
            onClick={() => setShowCouponInput(!showCouponInput)}
          >
            {showCouponInput ? (
              <>
                <ChevronUpIcon className="w-4 h-4 mr-1" />
                {t('hideCouponCode')}
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4 mr-1" />
                {t('useCouponCode')}
              </>
            )}
          </Button>
          {showCouponInput && (
            <div className="flex space-x-2 mt-2">
              <Input
                type="text"
                placeholder={t('enterCode')}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                {isApplyingCoupon ? t('applying') : t('apply')}
              </Button>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className={`flex justify-between ${rtlAlign}`}>
            <span>{t('subtotal')}</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={`flex justify-between text-sm text-muted-foreground ${rtlAlign}`}>
            <span>{t('shipping')}</span>
            <span>
              {shippingCost !== null 
                ? formatCurrency(shippingCost)
                : t('enterAddressToCalculate')}
            </span>
          </div>
          <div className={`flex justify-between text-sm text-muted-foreground ${rtlAlign}`}>
            <span>{t('tax')}</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          {couponDiscount > 0 && (
            <div className={`flex justify-between text-sm text-green-600 ${rtlAlign}`}>
              <span>{t('couponDiscount')}</span>
              <span>- {formatCurrency(couponDiscount)}</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className={`flex justify-between font-semibold text-lg ${rtlAlign}`}>
          <span>{t('total')}</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}