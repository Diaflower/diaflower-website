'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addressSchema, AddressFormData } from '@/schemas/addressSchema'
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

interface AddressFormProps {
  className?: string
  selectedAddress: AddressFormData | null
  onSubmit: (data: AddressFormData) => void
  lang: string
}

export default function AddressForm({ className, selectedAddress, onSubmit, lang }: AddressFormProps) {
  const t = useTranslations('account')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse gap-2')

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: selectedAddress || {
      title: 'MR',
      country: 'United Arab Emirates',
    },
  })

  const emirates = [
    { value: 'Dubai', label: t('Dubai') },
    { value: 'Abu Dhabi', label: t('Abu Dhabi') },
    { value: 'Sharjah', label: t('Sharjah') },
    { value: 'Ajman', label: t('Ajman') },
    { value: 'Ras Al Khaimah', label: t('Ras Al Khaimah') },
    { value: 'Fujairah', label: t('Fujairah') },
    { value: 'Umm Al Quwain', label: t('Umm Al Quwain') },
  ]

  const FormFieldWrapper = ({ children }: { children: React.ReactNode }) => (
    <FormItem>
      {children}
    </FormItem>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="addressTitle"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('addressTitle')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('addressTitlePlaceholder')} className={rtlAlign} />
              </FormControl>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('title')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className= {rtlDirection}>
                  <SelectTrigger className={rtlAlign}>
                    <SelectValue placeholder={t('selectTitle')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MR">{t('MR')}</SelectItem>
                  <SelectItem value="MS">{t('MS')}</SelectItem>
                  <SelectItem value="MRS">{t('MRS')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormFieldWrapper>
                <FormLabel className={cn("block", rtlAlign)}>{t('firstName')}</FormLabel>
                <FormControl>
                  <Input {...field} className={rtlAlign} />
                </FormControl>
                <FormMessage className={rtlAlign} />
              </FormFieldWrapper>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormFieldWrapper>
                <FormLabel className={cn("block", rtlAlign)}>{t('lastName')}</FormLabel>
                <FormControl>
                  <Input {...field} className={rtlAlign} />
                </FormControl>
                <FormMessage className={rtlAlign} />
              </FormFieldWrapper>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('addressLine1')}</FormLabel>
              <FormControl>
                <Input {...field} className={rtlAlign} />
              </FormControl>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('country')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={rtlDirection}>
                  <SelectTrigger className={rtlAlign}>
                    <SelectValue placeholder={t('selectCountry')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="United Arab Emirates">{t('UAE')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('emirate')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={rtlDirection}>
                  <SelectTrigger className={rtlAlign}>
                    <SelectValue placeholder={t('selectEmirate')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {emirates.map((emirate) => (
                    <SelectItem key={emirate.value} value={emirate.value}>{emirate.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('area')}</FormLabel>
              <FormControl>
                <Input {...field} className={rtlAlign} />
              </FormControl>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('postalCode')}</FormLabel>
              <FormControl>
                <Input {...field} className={rtlAlign} />
              </FormControl>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormFieldWrapper>
              <FormLabel className={cn("block", rtlAlign)}>{t('phoneNumber')}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" className={rtlAlign} />
              </FormControl>
              <FormMessage className={rtlAlign} />
            </FormFieldWrapper>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", rtlDirection)}>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className={rtlAlign}>
                  {t('setAsDefaultAddress')}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {selectedAddress ? t('updateAddress') : t('addAddress')}
        </Button>
      </form>
    </Form>
  )
}