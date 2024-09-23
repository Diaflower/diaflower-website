'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@clerk/nextjs'
import { CreateOrderDTO,createOrder } from '@/data/orders'

interface CheckoutContextType {
  createPaymentIntent: (orderData: Partial<CreateOrderDTO>) => Promise<{ clientSecret: string; orderId: string }>
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getToken } = useAuth()

  const createPaymentIntent = async (orderData: Partial<CreateOrderDTO>) => {
    try {
      const token = await getToken()
      const fullOrderData: CreateOrderDTO = {
        customerEmail: orderData.customerEmail || '',
        customerPhone: orderData.customerPhone || '',
        customerName: orderData.customerName || '',
        isAnonymous: !token, // Set to true if there's no token
        items: orderData.items || [],
        shippingAddressId: orderData.shippingAddressId,
        shippingAddress: orderData.shippingAddress,
        cardMessage: orderData.cardMessage,
        couponCode: orderData.couponCode,
        paymentMethod:orderData.paymentMethod,
      }

      const response = await createOrder(fullOrderData, token || undefined)
      return {
        clientSecret: response.clientSecret,
        orderId: response.order.id,
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }

  return (
    <CheckoutContext.Provider value={{ createPaymentIntent }}>
      {children}
    </CheckoutContext.Provider>
  )
}