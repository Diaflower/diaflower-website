import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Order, OrderItem } from "@/types/order";
import React from "react";
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from "@/util/rtl";

interface OrderDetailsProps {
  order: Order;
  lang: string;
}

export default function OrderDetails({ order, lang }: OrderDetailsProps) {
  const t = useTranslations('account')
  const rtlTextAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlPadding = useRTLAwareStyle('pl-4', 'pr-4')

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={rtlTextAlign}>{t('product')}</TableHead>
              <TableHead className={rtlTextAlign}>{t('quantity')}</TableHead>
              <TableHead className={rtlTextAlign}>{t('price')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item: OrderItem) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell className={rtlTextAlign}>{item.productId}</TableCell>
                  <TableCell className={rtlTextAlign}>{item.quantity}</TableCell>
                  <TableCell className={rtlTextAlign}>{t('currency', { amount: item.price })}</TableCell>
                </TableRow>
                {item.addons && item.addons.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className={`${rtlPadding} text-sm text-muted-foreground ${rtlTextAlign}`}>
                        <strong>{t('addons')}:</strong>
                        <ul className={rtlPadding}>
                          {item.addons.map((addon) => (
                            <li key={addon.id}>
                              {addon.addonId} - {t('quantity')}: {addon.quantity}, {t('price')}: {t('currency', { amount: addon.price })}
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
        <div className="flex justify-between">
          <h4 className="font-semibold">{t('subtotal')}</h4>
          <p>{t('currency', { amount: order.subtotal })}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="font-semibold">{t('shipping')}</h4>
          <p>{t('currency', { amount: order.shippingCost })}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="font-semibold">{t('tax')}</h4>
          <p>{t('currency', { amount: order.taxInfo })}</p>
        </div>
        <div className="flex justify-between">
          <h4 className="font-semibold">{t('total')}</h4>
          <p>{t('currency', { amount: order.total })}</p>
        </div>
      </div>
    </div>
  )
}