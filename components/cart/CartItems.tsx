'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Minus, Plus, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRTLAwareStyle } from '@/util/rtl'


export function CartItems() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [isHoveringItem, setIsHoveringItem] = useState<string | null>(null)
  const t = useTranslations('cart')
  const rtlDirection = useRTLAwareStyle('', 'w-full flex flex-row-reverse justify-between items-center')
  const rtlTable = useRTLAwareStyle('','flex flex-col')
  const rtlText = useRTLAwareStyle('','text-right')
  const formatPrice = (price: number) => t('currency', { amount: price })

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-semibold mb-2">{t('emptyCart')}</h2>
            <p className="text-center text-gray-500 mb-4">
              {t('emptyCartDescription')}
            </p>
            <Button>{t('startShopping')}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[60vh]">
      <Table className={rtlTable}>
        <TableHeader>
          <TableRow className={rtlDirection}>
            <TableHead className={`w-[40%] md:w-[50%] ${rtlText}`}>{t('item')}</TableHead>
            <TableHead className={`text-center w-[20%] ${rtlText}`}>{t('quantity')}</TableHead>
            <TableHead className="text-right hidden md:table-cell w-[15%]">{t('price')}</TableHead>
            <TableHead className="text-right w-[25%] md:w-[15%]">{t('total')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className={rtlDirection}>
              <TableCell className="font-medium">
                <div className={`flex items-start space-x-3 ${rtlDirection}`}>
                  <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-md overflow-hidden`}>
                    <Image
                      src={item.variation.image?.url || '/placeholder.svg'}
                      alt={item.variation.product?.name_en || t('productImage')}
                      width={80}
                      height={80}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm md:text-base font-medium text-gray-900 ${rtlText}`}>{item.variation.product?.name_en}</h3>
                    <p className="mt-1 text-xs md:text-sm text-gray-500">
                      {item.variation.size?.name_en && `${t('size')}: ${item.variation.size.name_en}, `}
                      {item.variation.infinityColor?.name_en && `${t('color')}: ${item.variation.infinityColor.name_en}, `}
                      {item.variation.boxColor?.name_en && `${t('box')}: ${item.variation.boxColor.name_en}, `}
                      {item.variation.wrappingColor?.name_en && `${t('wrapping')}: ${item.variation.wrappingColor.name_en}`}
                    </p>
                    {item.addons.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-xs md:text-sm font-medium text-gray-900">{t('addons')}:</h4>
                        {item.addons.map(addon => (
                          <div key={`${item.id}-${addon.id}`} className="text-xs md:text-sm text-gray-500">
                            {addon.name_en} ({addon.addonType}) - {formatPrice((addon.price || 0) * (addon.quantity || 1))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{formatPrice(item.variation.price)}</TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col md:flex-row justify-end items-end md:items-center">
                  <span className="font-medium mb-2 md:mb-0 md:mr-2">{formatPrice(item.variation.price * item.quantity)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground"
                    onMouseEnter={() => setIsHoveringItem(item.id)}
                    onMouseLeave={() => setIsHoveringItem(null)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('remove')}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}