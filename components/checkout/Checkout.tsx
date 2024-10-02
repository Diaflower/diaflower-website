'use client'

import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { ShippingForm } from './ShippingForm'
import { PaymentMethodSelection } from '../shared/PaymentMethodSelection'
import { PaymentForm } from './PayementForm'
import { CheckoutProvider } from '@/components/checkout/CheckoutContext'
import { PaymentSummary } from './PaymentSummary'
import { useCartStore } from '@/store/cartStore'
import { Steps } from '@/components/shared/Steps'
import { useTranslations } from 'next-intl'
import EmptyCart from '../shared/EmptyCart'
import { Skeleton } from '@/components/ui/skeleton'
import { createOrder } from '@/data/orders'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
  const t = useTranslations('checkout')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [selectedEmirate, setSelectedEmirate] = useState<string>('')
  const { items, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState<number>(0)
  const [isStoreHydrated, setIsStoreHydrated] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'CASH_ON_DELIVERY' | null>(null)
  const [shippingData, setShippingData] = useState<any>(null)
  const { getToken } = useAuth()
  const router = useRouter()

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe' as const,
    },
  }

  const handleCouponApplied = (code: string, discount: number) => {
    setCouponCode(code)
    setCouponDiscount(discount)
  }

  useEffect(() => {
    if (items.length > 0 || document.cookie.includes('cart-storage')) {
      setIsStoreHydrated(true)
    } else {
      const timer = setTimeout(() => {
        setIsStoreHydrated(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [items])

  const completeOrderForCashOnDelivery = async () => {
    try {
      
      // const token = await getToken() ?? '';
      const token =  '';

      console.log("first",token)
      const orderData = {
        ...shippingData,
        items: items.map(item => ({
          productId: item.productId,
          productVariationId: item.variationId,
          quantity: item.quantity,
          price: item.variation.price.toString(),
          addons: item.addons.map(addon => ({
            addonId: addon.id,
            addonVariationId: addon.id,
            quantity: addon.quantity || 1,
            price: addon.price.toString(),
          })),
        })),
        paymentMethod: 'CASH_ON_DELIVERY',
        couponCode: couponCode || undefined,
      }

      const order = await createOrder(orderData, token)
      clearCart()
      router.push(`/order/success?orderId=${order.order.id}`)
      toast({
        title: t('orderPlaced'),
        description: t('cashOnDeliveryOrderPlaced'),
        duration: 5000,
      })
    } catch (error) {
      console.error('Error creating cash on delivery order:', error)
      toast({
        title: t('error'),
        description: t('errorCreatingOrder'),
        variant: 'destructive',
        duration: 5000,
      })
    }
  }

  const handlePaymentMethodSelection = async (method: 'ONLINE' | 'CASH_ON_DELIVERY') => {
    setPaymentMethod(method)
    if (method === 'CASH_ON_DELIVERY') {
      await completeOrderForCashOnDelivery()
    } else {
      // Create PaymentIntent for online payment
      try {
        // const token = await getToken() ?? '';
        const token = '';
        
        const orderData = {
          ...shippingData,
          items: items.map(item => ({
            productId: item.productId,
            productVariationId: item.variationId,
            quantity: item.quantity,
            price: item.variation.price.toString(),
            addons: item.addons.map(addon => ({
              addonId: addon.id,
              addonVariationId: addon.id,
              quantity: addon.quantity || 1,
              price: addon.price.toString(),
            })),
          })),
          paymentMethod: 'ONLINE',
          couponCode: couponCode || undefined,
        }

        const response = await createOrder(orderData, token)
        setClientSecret(response.clientSecret)
        setCurrentStep(2)
      } catch (error) {
        console.error('Error creating PaymentIntent:', error)
        toast({
          title: t('error'),
          description: t('errorCreatingPaymentIntent'),
          variant: 'destructive',
          duration: 5000,
        })
      }
    }
  }

  if (!isStoreHydrated) {
    return <Skeleton className="h-[720px] w-full" />
  }

  if (items.length === 0) {
    return <EmptyCart />
  }


  return (
    <CheckoutProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('checkoutTitle')}</h1>
        <Steps
          steps={[t('shippingStep'), t('paymentMethodStep'), t('paymentStep')]}
          currentStep={currentStep}
          className="mb-8"
        />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 order-2 md:order-1">
            {currentStep === 0 && (
              <ShippingForm
                onComplete={(data) => {
                  setShippingData(data)
                  setCurrentStep(1)
                }}
                onEmirateChange={setSelectedEmirate}
              />
            )}
            {currentStep === 1 && (
              <PaymentMethodSelection
                onSelect={handlePaymentMethodSelection}
              />
            )}
            {currentStep === 2 && clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm 
                  clientSecret={clientSecret}
                  shippingData={shippingData}
                  items={items}
                  paymentMethod="ONLINE"
                />
              </Elements>
            )}
          </div>
          <div className="w-full md:w-1/3 order-1 md:order-2">
            <PaymentSummary
              emirate={selectedEmirate}
              onCouponApplied={handleCouponApplied}
            />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  )
}