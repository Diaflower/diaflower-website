'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { updateOrderStatus, fetchOrderById } from '@/data/orders'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Flower, AlertTriangle } from "lucide-react"
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface OrderDetails {
  id: string;
  total: string;
  items: Array<{
    quantity: number;
    price: string;
    product: {
      name: string; // This will be either name_en or name_ar based on the language
    };
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    state: string;
    country: string;
  };
}

export default function OrderSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const orderId = searchParams.get('orderId')
  const { clearCart } = useCartStore()
  const { getToken } = useAuth()
  const params = useParams()
  const lang = params.lang as string
  const t = useTranslations('checkout')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (paymentIntentId) {
          const response = await updateOrderStatus(paymentIntentId)
          if (response.order) {
            setOrderDetails(response.order)
            clearCart()
          } else if (response.message === "Order already paid, no update necessary") {
            setError(t('orderAlreadyProcessed'))
          } else {
            setError(t('unableToRetrieveOrderDetails'))
          }
        } else if (orderId) {
          const token = await getToken()
          const order = await fetchOrderById(token ?? '', orderId, lang)
          setOrderDetails(order)
          clearCart()
        } else {
          setError(t('noOrderInformation'))
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
        setError(t('errorProcessingOrder'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [paymentIntentId, orderId, clearCart, getToken, lang, t])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100">
        <Loader2 className="h-12 w-12 animate-spin text-rose-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{t('orderProcessingIssue')}</h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <Button asChild className="mt-6 bg-rose-600 hover:bg-rose-700">
                <Link href={`/${lang}`}>{t('returnToShop')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{t('orderDetailsUnavailable')}</h2>
              <p className="mt-2 text-gray-600">{t('couldntRetrieveOrderDetails')}</p>
              <Button asChild className="mt-6 bg-rose-600 hover:bg-rose-700">
                <Link href={`/${lang}`}>{t('continueShopping')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">{t('thankYouForYourOrder')}</h2>
            <p className="mt-2 text-xl text-gray-600">{t('flowersOnTheWay')}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">{t('orderDetails')}</h3>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">{t('orderNumber')}</dt>
                <dd className="text-sm text-gray-900">{orderDetails.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">{t('totalAmount')}</dt>
                <dd className="text-sm text-gray-900">AED {orderDetails.total}</dd>
              </div>
            </dl>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-medium text-gray-900">{t('itemsOrdered')}</h3>
            <ul className="mt-4 space-y-3">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <div className="flex items-center">
                    <Flower className="h-5 w-5 text-rose-500 mr-2" />
                    <span className="text-sm text-gray-900">{item.product.name} x {item.quantity}</span>
                  </div>
                  <span className="text-sm text-gray-600">AED {item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-medium text-gray-900">{t('shippingAddress')}</h3>
            <address className="mt-4 text-sm text-gray-600 not-italic">
              {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}<br />
              {orderDetails.shippingAddress.addressLine1}<br />
              {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}
            </address>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              {t('confirmationEmailSent')}
            </p>
            <Button asChild className="bg-rose-600 hover:bg-rose-700">
              <Link href={`/${lang}`}>{t('continueShopping')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}