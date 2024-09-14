'use client'
import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { PaymentForm } from './PayementForm'
import { ShippingForm } from './ShippingForm'
import { CheckoutProvider } from '@/components/checkout/CheckoutContext'
import { PaymentSummary } from './PaymentSummary'
import { useCartStore } from '@/store/cartStore'
import { Steps } from '@/components/shared/Steps'
import { useTranslations } from 'next-intl'
import EmptyCart from '../shared/EmptyCart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout() {
  const t = useTranslations('checkout')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [selectedEmirate, setSelectedEmirate] = useState<string>('')
  const { items } = useCartStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState<number>(0)
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

  if (items.length === 0) {
    return <EmptyCart/>
  }

  return (
    <CheckoutProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('checkoutTitle')}</h1>
        <Steps
          steps={[t('shippingStep'), t('paymentStep')]}
          currentStep={currentStep}
          className="mb-8"
        />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 order-2 md:order-1">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm clientSecret={clientSecret} />
              </Elements>
            ) : (
              <ShippingForm 
                onClientSecretReady={(secret) => {
                  setClientSecret(secret)
                  setCurrentStep(1)
                }}
                onEmirateChange={setSelectedEmirate}
                couponCode={couponCode}
                couponDiscount={couponDiscount}
              />
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