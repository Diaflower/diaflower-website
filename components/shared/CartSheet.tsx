'use client'

import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import {ShoppingBag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { CartContent } from './CartContent'
import Link from 'next/link'

export default function CartSheet() {
  const { items, getTotalPrice, getTotalItems } = useCartStore()
 
 
  
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')

  const formatPrice = (price: number) => t('currency', { amount: price.toFixed(2) })

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold mb-2">{t('emptyCart')}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t('emptyCartDescription')}</p>
        <SheetClose asChild>
          <Button>{t('continueShopping')}</Button>
        </SheetClose>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full mt-6">
      <div className={rtlAlign}>
        <h2 className={`text-lg font-bold ${letterSpacing}`}>{t('yourCart')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('itemsInCart', { count: getTotalItems() })}
        </p>
      </div>
      <ScrollArea className="flex-1">
      <CartContent variant="sheet" />
      </ScrollArea>
      <SheetFooter className="">
        <div className={`mt-6 w-full ${rtlAlign}`}>
          <div className="flex justify-between text-base font-medium">
            <p>{t('subtotal')}</p>
            <p>{formatPrice(getTotalPrice())}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{t('shippingAndTaxes')}</p>
          <div className="mt-6">
          <Link href='/cart'>
              <Button className="w-full">
                {t('checkout')}
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
            <p>
              {t('or')}{' '}
              <SheetClose asChild>
                <Button variant="link" className="font-medium text-primary hover:text-primary/80">
                  {t('continueShopping')}
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </SheetClose>
            </p>
          </div>
        </div>
      </SheetFooter>
    </div>
  )
}