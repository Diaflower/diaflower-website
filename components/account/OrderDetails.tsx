import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Order, OrderItem } from "@/types/order";
import React from "react";
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from "@/util/rtl";
import Image from 'next/image'

interface OrderDetailsProps {
  order: Order;
  lang: string;
}

export default function OrderDetails({ order, lang }: OrderDetailsProps) {
  const t = useTranslations('account')
  const rtlTextAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlPadding = useRTLAwareStyle('pl-4', 'pr-4')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')
  const rtlDirection2 = useRTLAwareStyle('', 'w-full flex flex-row-reverse justify-between items-center')
  const rtlTable = useRTLAwareStyle('','flex flex-col')

  return (
    <div className="space-y-6">
      <div className={rtlTextAlign}>
        <p className="text-sm text-muted-foreground">
          {t('orderPlacedOn', { date: new Date(order.createdAt).toLocaleString(lang) })}
        </p>
      </div>
      <div className={rtlTextAlign}>
        <h4 className="font-semibold mb-2">{t('status')}</h4>
        <Badge>{order.status}</Badge>
      </div>
      <div>
        <h4 className={`font-semibold mb-2 ${rtlTextAlign}`}>{t('items')}</h4>
        <Table className={rtlTable}>
          <TableHeader>
            <TableRow className={rtlDirection2}>
              <TableHead className={rtlTextAlign}>{t('product')}</TableHead>
              <TableHead className={rtlTextAlign}>{t('quantity')}</TableHead>
              <TableHead className={rtlTextAlign}>{t('price')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item: OrderItem) => (
              <React.Fragment key={item.id}>
                <TableRow className={rtlDirection2}>
                  <TableCell className={rtlTextAlign}>
                    <div className={`flex ${rtlDirection2} items-center space-x-2`}>
                      {item.product.mainImage && (
                        <Image
                          src={item.product.mainImage.url}
                          alt={item.product.mainImage.altText || item.product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.productVariation.size && `${t('size')}: ${item.productVariation.size.name}`}
                          {item.productVariation.infinityColor && `, ${t('infinityColor')}: ${item.productVariation.infinityColor.name}`}
                          {item.productVariation.boxColor && `, ${t('boxColor')}: ${item.productVariation.boxColor.name}`}
                          {item.productVariation.wrappingColor && `, ${t('wrappingColor')}: ${item.productVariation.wrappingColor.name}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={rtlTextAlign}>{item.quantity}</TableCell>
                  <TableCell className={rtlTextAlign}>{t('currency', { amount: item.price })}</TableCell>
                </TableRow>
                {item.addons && item.addons.length > 0 && (
                  <TableRow className={rtlDirection}>
                    <TableCell colSpan={3}>
                      <div className={`${rtlPadding} text-sm text-muted-foreground ${rtlTextAlign}`}>
                        <strong>{t('addons')}:</strong>
                        <ul className={rtlPadding}>
                          {item.addons.map((addon) => (
                            <li key={addon.id}>
                              {addon.addon.name} - {t('quantity')}: {addon.quantity}, {t('price')}: {t('currency', { amount: addon.price })}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={rtlTextAlign}>
        <h4 className="font-semibold mb-2">{t('shippingAddress')}</h4>
        <p>{order.shippingAddress.addressLine1}</p>
        <p>{order.shippingAddress.area}, {order.shippingAddress.state}</p>
        <p>{order.shippingAddress.country} {order.shippingAddress.postalCode}</p>
      </div>
      <div className={`flex flex-col justify-between ${rtlTextAlign}`}>
        <div className={`flex justify-between ${rtlDirection}`}>
          <h4 className="font-semibold">{t('subtotal')}</h4>
          <p>{t('currency', { amount: order.subtotal })}</p>
        </div>
        <div className={`flex justify-between ${rtlDirection}`}>
          <h4 className="font-semibold">{t('shipping')}</h4>
          <p>{t('currency', { amount: order.shippingCost })}</p>
        </div>
        <div className={`flex justify-between ${rtlDirection}`}>
          <h4 className="font-semibold">{t('tax')}</h4>
          <p>{t('currency', { amount: order.taxInfo })}</p>
        </div>
        <div className={`flex justify-between ${rtlDirection}`}>
          <h4 className="font-semibold">{t('total')}</h4>
          <p>{t('currency', { amount: order.total })}</p>
        </div>
      </div>
    </div>
  )
}