'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCartStore } from '@/store/cartStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { useCheckout } from './CheckoutContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { CreateOrderDTO } from '@/data/orders'
import { useQuery } from '@tanstack/react-query'
import { fetchUserData } from '@/data/user'
import { useAuth } from '@clerk/nextjs'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

const formSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number is required'),
  shippingAddress: z.object({
    title: z.enum(['MR', 'MS', 'MRS']),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    addressLine1: z.string().min(1, 'Address is required'),
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'Emirate is required'),
    area: z.string().min(1, 'Area is required'),
    phone: z.string().min(1, 'Phone is required'),
  }),
  isRecipient: z.boolean(),
  cardMessage: z.string().optional(),
})

interface ShippingFormProps {
  onClientSecretReady: (clientSecret: string) => void
  onEmirateChange: (emirate: string) => void
  couponCode: string | null
  couponDiscount: number
}

export function ShippingForm({ onClientSecretReady, onEmirateChange, couponCode, couponDiscount }: ShippingFormProps) {
  const t = useTranslations('checkout')
  const [isLoading, setIsLoading] = useState(false)
  const { createPaymentIntent } = useCheckout()
  const { items } = useCartStore()
  const { isSignedIn, getToken } = useAuth()
  const [isRecipient, setIsRecipient] = useState(false)
  const rtlMargin = useRTLAwareStyle('', 'mr-2')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return fetchUserData(token)
    },
    enabled: isSignedIn,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      shippingAddress: {
        title: 'MR',
        firstName: '',
        lastName: '',
        addressLine1: '',
        country: 'United Arab Emirates',
        state: '',
        area: '',
        phone: '',
      },
      isRecipient: false,
      cardMessage: '',
    },
  })

  useEffect(() => {
    if (userData) {
      form.setValue('customerName', `${userData.firstName} ${userData.lastName}`.trim())
      form.setValue('customerEmail', userData.email)
      form.setValue('customerPhone', userData.phone || '')
    }
  }, [userData, form])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (items.length === 0) {
      console.error(t('noItemsInCart'))
      return
    }

    setIsLoading(true)

    try {
      const orderData: Partial<CreateOrderDTO> = {
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
        ...data,
        couponCode: couponCode || undefined,
      }
      const { clientSecret } = await createPaymentIntent(orderData)
      onClientSecretReady(clientSecret)
    } catch (error) {
      console.error(t('errorCreatingPaymentIntent'), error)
    }

    setIsLoading(false)
  }

  const handleIsRecipientChange = (checked: boolean) => {
    setIsRecipient(checked)
    if (checked) {
      const [firstName, ...lastNameParts] = form.getValues('customerName').split(' ')
      form.setValue('shippingAddress.firstName', firstName)
      form.setValue('shippingAddress.lastName', lastNameParts.join(' '))
      form.setValue('shippingAddress.phone', form.getValues('customerPhone'))
    } else {
      form.setValue('shippingAddress.firstName', '')
      form.setValue('shippingAddress.lastName', '')
      form.setValue('shippingAddress.phone', '')
    }
  }

  if (isUserDataLoading) {
    return <div>{t('loadingUserData')}</div>
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isSignedIn && (
              <div className="flex justify-between items-center bg-muted p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold">{t('haveAccount')}</h2>
                <Button variant="link" className="text-primary underline underline-offset-4" asChild>
                  <Link href="/sign-in">{t('signIn')}</Link>
                </Button>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-4 mt-2">{t('personalInformation')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fullName')}</FormLabel>
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
                      <FormLabel>{t('email')}</FormLabel>
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
                      <FormLabel>{t('phone')}</FormLabel>
                      <FormControl>
                        <Controller
                          name="customerPhone"
                          control={form.control}
                          render={({ field }) => (
                            <PhoneInput
                              international
                              defaultCountry="AE"
                              value={field.value}
                              onChange={field.onChange}
                              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${rtlDirection}`}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-4">{t('deliveryLocation')}</h2>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="isRecipient"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            handleIsRecipientChange(checked as boolean)
                          }}
                        />
                      </FormControl>
                      <div className={`space-y-1 leading-none ${rtlMargin}`}>
                        <FormLabel className={rtlMargin}>
                          {t('iAmRecipient')}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shippingAddress.title"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>{t('title')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectTitle')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MR">{t('MR')}</SelectItem>
                          <SelectItem value="MS">{t('MS')}</SelectItem>
                          <SelectItem value="MRS">{t('MRS')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingAddress.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('firstName')}</FormLabel>
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
                      <FormLabel>{t('lastName')}</FormLabel>
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
                      <FormLabel>{t('recipientPhone')}</FormLabel>
                      <FormControl>
                        <Controller
                          name="shippingAddress.phone"
                          control={form.control}
                          render={({ field }) => (
                            <PhoneInput
                              international
                              defaultCountry="AE"
                              value={field.value}
                              onChange={field.onChange}
                              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${rtlDirection}`}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingAddress.country"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>{t('country')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className={rtlDirection}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectCountry')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="United Arab Emirates">{t('UAE')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('emirate')}</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                          onEmirateChange(value)
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl className={rtlDirection}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectEmirate')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dubai">{t('Dubai')}</SelectItem>
                          <SelectItem value="Abu Dhabi">{t('Abu Dhabi')}</SelectItem>
                          <SelectItem value="Sharjah">{t('Sharjah')}</SelectItem>
                          <SelectItem value="Ajman">{t('Ajman')}</SelectItem>
                          <SelectItem value="Ras Al Khaimah">{t('Ras Al Khaimah')}</SelectItem>
                          <SelectItem value="Fujairah">{t('Fujairah')}</SelectItem>
                          <SelectItem value="Umm Al Quwain">{t('Umm Al Quwain')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingAddress.area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('area')}</FormLabel>
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
                    <FormItem className="col-span-2">
                      <FormLabel>{t('address')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-4">{t('cardMessage')}</h2>
              <FormField
                control={form.control}
                name="cardMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('messageOptional')}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('processing') : t('continueToPayment')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}