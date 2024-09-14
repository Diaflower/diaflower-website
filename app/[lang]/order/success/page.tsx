'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { updateOrderStatus } from '@/data/orders'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Flower, AlertTriangle } from "lucide-react"
import Link from 'next/link'

interface OrderDetails {
  id: string;
  total: string;
  items: Array<{
    quantity: number;
    price: string;
    product: {
      name_en: string;
      name_ar: string;
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
  const { clearCart } = useCartStore()

  useEffect(() => {
    if (paymentIntentId) {
      updateOrderStatus(paymentIntentId)
        .then((response) => {
          setIsLoading(false)
          if (response.order) {
            setOrderDetails(response.order)
            clearCart()
          } else if (response.message === "Order already paid, no update necessary") {
            setError("This order has already been processed. If you haven't received a confirmation email, please contact our support.")
          } else {
            setError("Unable to retrieve order details. Please contact our support.")
          }
        })
        .catch((error: any) => {
          console.error('Error updating order status:', error)
          setIsLoading(false)
          setError("An error occurred while processing your order. Please contact our support.")
        })
    } else {
      setIsLoading(false)
      setError("No payment information found. Please try placing your order again.")
    }
  }, [paymentIntentId, clearCart])

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
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">Order Processing Issue</h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <Button asChild className="mt-6 bg-rose-600 hover:bg-rose-700">
                <Link href="/">Return to Shop</Link>
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
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">Order Details Unavailable</h2>
              <p className="mt-2 text-gray-600">We couldn't retrieve your order details. Please contact our support team for assistance.</p>
              <Button asChild className="mt-6 bg-rose-600 hover:bg-rose-700">
                <Link href="/">Continue Shopping</Link>
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
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Thank You for Your Order!</h2>
            <p className="mt-2 text-xl text-gray-600">Your beautiful flowers are on their way.</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">Order Number:</dt>
                <dd className="text-sm text-gray-900">{orderDetails.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">Total Amount:</dt>
                <dd className="text-sm text-gray-900">AED {orderDetails.total}</dd>
              </div>
            </dl>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-lg font-medium text-gray-900">Items Ordered</h3>
          <ul className="mt-4 space-y-3">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <div className="flex items-center">
                  <Flower className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm text-gray-900">{item.product.name_en} x {item.quantity}</span>
                </div>
                <span className="text-sm text-gray-600">AED {item.price}</span>
              </li>
            ))}
          </ul>
        </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
            <address className="mt-4 text-sm text-gray-600 not-italic">
              {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}<br />
              {orderDetails.shippingAddress.addressLine1}<br />
              {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.country}
            </address>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              We've sent a confirmation email with all the details to your registered email address.
            </p>
            <Button asChild className="bg-rose-600 hover:bg-rose-700">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}