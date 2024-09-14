'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { fetchOrders } from '@/data/orders'
import OrderDetails from './OrderDetails'
import { Order, OrdersResponse } from '@/types/order'
import { ResponsiveDialog } from '@/components/shared/ResponsiveDialog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useTranslations } from 'next-intl'

import { useRTLAwareStyle } from '@/util/rtl'

export default function OrdersList({ lang }: { lang: string }) {
  const { isLoaded, userId, getToken } = useAuth()
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const t = useTranslations('account')
  const rtlFlexDirection = useRTLAwareStyle('flex-row', 'flex-row-reverse')
  const rtlMargin = useRTLAwareStyle('mr-2', 'ml-2')

  const { data: orders, isLoading, isError } = useQuery<OrdersResponse>({
    queryKey: ['orders', page],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return fetchOrders(token, page)
    },
    enabled: isLoaded && !!userId,
  })

  if (isLoading) return <div>{t('loadingOrders')}</div>
  if (isError) return <div>{t('errorLoadingOrders')}</div>

  return (
    <div className="space-y-6">
      {orders && orders.items.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.items.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t('orderNumber', { id: order.id })}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('orderDate', { date: new Date(order.createdAt).toLocaleDateString(lang) })}
                  </p>
                  <p className="text-sm mb-2">{t('orderStatus', { status: order.status })}</p>
                  <p className="text-sm mb-4">{t('orderTotal', { total: order.total })}</p>
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    <Eye className={rtlMargin} /> {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Pagination>
            <PaginationContent className={rtlFlexDirection}>
              <PaginationItem>
                <PaginationPrevious 
                  cont={t('previous')}
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                >
                </PaginationPrevious>
              </PaginationItem>
              {[...Array(orders.totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href="#" 
                    isActive={page === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  cont= {t('next')}
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < orders.totalPages) setPage(page + 1);
                  }}
                >
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground mb-4">{t('noOrders')}</p>
          </CardContent>
        </Card>
      )}
      <ResponsiveDialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        title={t('orderDetailsTitle', { id: selectedOrder?.id })}
      >
        {selectedOrder && <OrderDetails order={selectedOrder} lang={lang} />}
      </ResponsiveDialog>
    </div>
  )
}