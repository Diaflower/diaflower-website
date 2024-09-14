'use client'

import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useCheckout } from './CheckoutContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCartStore } from '@/store/cartStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number is required'),
  shippingAddress: z.object({
    addressTitle: z.string().optional(),
    title: z.enum(['MR', 'MS', 'MRS']).optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().optional(),
    addressLine1: z.string().min(1, 'Address is required'),
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    area: z.string().optional(),
    postalCode: z.string().optional(),
    phone: z.string().min(1, 'Phone is required'),
  }),
  cardMessage: z.string().optional(),
  isAnonymous: z.boolean(),
})

interface CheckoutFormProps {
  clientSecret?: string
  onClientSecretReady?: (clientSecret: string) => void
}

export function CheckoutForm({ clientSecret, onClientSecretReady }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { createPaymentIntent } = useCheckout()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      shippingAddress: {
        addressTitle: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        country: '',
        state: '',
        area: '',
        postalCode: '',
        phone: '',
      },
      cardMessage: '',
      isAnonymous: false,
    },
  })

  const handleCreatePaymentIntent = async (formData: z.infer<typeof formSchema>) => {
    if (items.length === 0) {
      console.error('No items in cart')
      return
    }

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          productVariationId: item.variationId,
          quantity: item.quantity,
          price: item.variation.price.toString(),
          addons: item.addons.map(addon => ({
            addonId: addon.id,
            addonVariationId: addon.id,
            quantity: addon.quantity || 1,
            price: addon.price.toString(),
          })),
        })),
        ...formData,
      }
      const { clientSecret } = await createPaymentIntent(orderData)
      if (onClientSecretReady) {
        onClientSecretReady(clientSecret)
      }
    } catch (error) {
      console.error('Error creating PaymentIntent:', error)
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (clientSecret) {
      if (!stripe || !elements) {
        console.error('Stripe.js has not loaded yet.')
        return
      }

      setIsLoading(true)

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order/success`,
          payment_method_data: {
            billing_details: {
              name: data.customerName,
              email: data.customerEmail,
              phone: data.customerPhone,
              address: {
                line1: data.shippingAddress.addressLine1,
                city: data.shippingAddress.state,
                state: data.shippingAddress.state,
                country: data.shippingAddress.country,
                postal_code: data.shippingAddress.postalCode,
              },
            },
          },
        },
      })

      if (error) {
        console.error(error)
        // Handle the error (e.g., show an error message to the user)
      } else {
        // Payment succeeded, you can handle success here if needed
        console.log("Payment succeeded")
      }

      setIsLoading(false)
    } else {
      await handleCreatePaymentIntent(data)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shippingAddress.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="shippingAddress.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Send anonymously
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {clientSecret && stripe && elements ? (
              <PaymentElement />
            ) : null}yy

            <Button type="submit" className="w-full" disabled={isLoading || (clientSecret && (!stripe || !elements)) || items.length === 0}>
              {isLoading ? 'Processing...' : clientSecret ? 'Pay Now' : 'Proceed to Payment'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


