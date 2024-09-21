// components/checkout/PaymentMethodSelection.tsx
import React from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Banknote } from 'lucide-react'

interface PaymentMethodSelectionProps {
  onSelect: (method: 'ONLINE' | 'CASH_ON_DELIVERY') => void
}

export function PaymentMethodSelection({ onSelect }: PaymentMethodSelectionProps) {
  const t = useTranslations('checkout')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('selectPaymentMethod')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => onSelect('ONLINE')}
          className="w-full justify-start text-left"
          variant="outline"
        >
          <CreditCard className="mr-2" />
          {t('onlinePayment')}
        </Button>
        <Button
          onClick={() => onSelect('CASH_ON_DELIVERY')}
          className="w-full justify-start text-left"
          variant="outline"
        >
          <Banknote className="mr-2" />
          {t('cashOnDelivery')}
        </Button>
      </CardContent>
    </Card>
  )
}