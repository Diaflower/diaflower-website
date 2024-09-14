'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

export default function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()
  const [isHoveringItem, setIsHoveringItem] = useState<string | null>(null)
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')
  const rtlMargin = useRTLAwareStyle('ml-4', 'mr-4')

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
        <h2 className="text-lg font-semibold">{t('yourCart')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('itemsInCart', { count: getTotalItems() })}
        </p>
      </div>
      <ScrollArea className="flex-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative flex flex-col py-6 border-b last:border-b-0`}
            onMouseEnter={() => setIsHoveringItem(item.id)}
            onMouseLeave={() => setIsHoveringItem(null)}
          >
            <div className={`flex ${rtlDirection}`}>
              <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border">
                <Image
                  src={item.variation.image?.url || '/placeholder.svg'}
                  alt={item.variation.product?.name_en || t('productImage')}
                  width={96}
                  height={96}
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className={`${rtlMargin} flex-1 flex flex-col ${rtlAlign}`}>
                <div>
                  <div className={`${rtlDirection} flex justify-between text-base font-medium`}>
                    <h3>{item.variation.product?.name_en}</h3>
                    <p>{formatPrice(item.variation.price * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.variation.size?.name_en} - {item.variation.infinityColor?.name_en}
                  </p>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className={`text-muted-foreground transition-opacity duration-200 ${
                      isHoveringItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('remove')}</span>
                  </Button>
                </div>
              </div>
            </div>
            {item.addons.length > 0 && (
              <div className={`mt-4 ${rtlAlign}`}>
                <h4 className="text-sm font-medium mb-2">{t('addons')}:</h4>
                {item.addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-sm mb-1">
                    <span>{addon.name_en} ({addon.addonType})</span>
                    <span>{formatPrice((addon.price || 0) * (addon.quantity || 1))}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
      <SheetFooter className="">
        <div className={`mt-6 w-full ${rtlAlign}`}>
          <div className="flex justify-between text-base font-medium">
            <p>{t('subtotal')}</p>
            <p>{formatPrice(getTotalPrice())}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{t('shippingAndTaxes')}</p>
          <div className="mt-6">
            <Button className="w-full">
              {t('checkout')}
            </Button>
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