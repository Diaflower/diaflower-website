'use client'

import React, { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslations } from 'next-intl'

interface PaymentFormProps {
  clientSecret: string
  shippingData: any
  items: any[]
  paymentMethod: 'ONLINE'
}

export function PaymentForm({ clientSecret, shippingData, items, paymentMethod }: PaymentFormProps) {
  const t = useTranslations('checkout')
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!stripe) {
      return
    }

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setError(t('paymentSucceeded'))
          break
        case "processing":
          setError(t('paymentProcessing'))
          break
        case "requires_payment_method":
          setError(null)
          break
        default:
          setError(t('paymentError'))
          break
      }
    })
  }, [stripe, clientSecret, t])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error(t('stripeNotLoaded'))
      return
    }

    setIsLoading(true)
    setError(null)

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success`,
      },
    })

    if (submitError) {
      setError(submitError.message ?? t('unexpectedError'))
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('paymentInformation')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4" disabled={isLoading || !stripe || !elements}>
            {isLoading ? t('processing') : t('payNow')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}