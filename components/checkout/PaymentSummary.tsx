'use client'

import React, { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

interface PaymentSummaryProps {
  emirate: string
  onCouponApplied: (code: string, discount: number) => void
}

export function PaymentSummary({ emirate, onCouponApplied }: PaymentSummaryProps) {
  const t = useTranslations('checkout')
  const { items, getTotalPrice } = useCartStore()
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')

  console.log("items:",items)
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

    setIsApplyingCoupon(true)

    try {
      const response = await axios.post('http://localhost:3001/api/coupons/validate', { code: couponCode, subtotal })
      const { isValid, discountAmount, message } = response.data

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
        toast({
          title: t('invalidCoupon'),
          description: message,
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
        <CardTitle>{t('orderSummary')}</CardTitle>
        <Button variant="ghost" size="sm" className="md:hidden">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </CardHeader>

      <CardContent className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.variation.image?.url || '/placeholder.svg'}
                  alt={item.variation.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.variation.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {/* {item.variation.product.name_en && `${t('variant')}:`} */}
                  {item.variation.size && `${t('size')}: ${item.variation.size.name}`}
                  {item.variation.boxColor && `, ${t('box')}: ${item.variation.boxColor.name}`}
                  {item.variation.infinityColor && `, ${t('infinity')}: ${item.variation.infinityColor.name}`}
                  {item.variation.wrappingColor && `, ${t('wrapping')}: ${item.variation.wrappingColor}`}
                </p>
                {item.addons.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {t('addons')}: {item.addons.map(addon => `${addon.name} (${formatCurrency(+addon.price)})`).join(', ')}
                  </div>
                )}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm">{t('quantity')}: {item.quantity}</span>
                  <span className="font-semibold">
                    {formatCurrency(item.variation.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
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