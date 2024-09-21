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
import { CartContent } from '../shared/CartContent'


export function CartItems() {
  const { items, } = useCartStore()
  const t = useTranslations('cart')
  const rtlDirection = useRTLAwareStyle('', 'w-full flex flex-row-reverse justify-between items-center')
  const rtlTable = useRTLAwareStyle('','flex flex-col')
  const rtlText = useRTLAwareStyle('','text-right')
  

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center md:h-[60vh]">
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
    <ScrollArea className="md:h-[60vh]">
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
           <CartContent variant='page'/>
        </TableBody>
      </Table>
    </ScrollArea>
  )
}