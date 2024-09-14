'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { toast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { userProfileSchema, UserProfileFormData } from '@/schemas/userSchema'
import { fetchUserData, updateUserData } from '@/data/user'
import { useAuth } from '@clerk/nextjs'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { countries } from 'countries-list'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

export default function ProfileForm({ lang }: { lang: string }) {
  const { isLoaded, userId, getToken } = useAuth()
  const queryClient = useQueryClient()
  const t = useTranslations('account')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return fetchUserData(token)
    },
    enabled: isLoaded && !!userId,
  })

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: userData || {},
  })

  useEffect(() => {
    if (userData) {
      const formattedUserData = {
        ...userData,
        dob: userData.dob ? new Date(userData.dob) : undefined,
      }
      form.reset(formattedUserData)
    }
  }, [userData, form])

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserProfileFormData) => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return updateUserData(token, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
      toast({
        title: t('profileUpdateSuccess'),
        description: t('profileUpdateDescription'),
      })
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('profileUpdateError'),
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: UserProfileFormData) => {
    updateUserMutation.mutate(data)
  }

  if (isLoading) {
    return <div>{t('loadingProfile')}</div>
  }

  if (isError) {
    return <div>{t('errorLoadingProfile')}</div>
  }

  const countryOptions = Object.entries(countries)
    .map(([code, country]) => ({
      value: code,
      label: country.name
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('personalInformation')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={rtlAlign}>{t('title')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className={`flex ${rtlDirection} space-x-4`}
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="MR" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('MR')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="MRS" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('MRS')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="MS" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('MS')}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className={rtlAlign} />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('firstName')}</FormLabel>
                    <FormControl>
                      <Input {...field} className={rtlAlign} />
                    </FormControl>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('lastName')}</FormLabel>
                    <FormControl>
                      <Input {...field} className={rtlAlign} />
                    </FormControl>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('dateOfBirth')}</FormLabel>
                    <FormControl className={rtlDirection}>
                      <Input
                        type="date"
                        {...field}
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className={rtlAlign}
                      />
                    </FormControl>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('nationality')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl className={rtlDirection} >
                        <SelectTrigger className={rtlAlign}>
                          <SelectValue placeholder={t('selectNationality')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('maritalStatus')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl className={rtlDirection}>
                        <SelectTrigger className={rtlAlign}>
                          <SelectValue placeholder={t('selectMaritalStatus')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SINGLE">{t('SINGLE')}</SelectItem>
                        <SelectItem value="MARRIED">{t('MARRIED')}</SelectItem>
                        <SelectItem value="DIVORCED">{t('DIVORCED')}</SelectItem>
                        <SelectItem value="WIDOWED">{t('WIDOWED')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('contactInformation')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('emailAddress')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className={rtlAlign} />
                    </FormControl>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('phoneNumber')}</FormLabel>
                    <FormControl>
                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                          <PhoneInput
                            international
                            defaultCountry="AE"
                            value={field.value}
                            onChange={field.onChange}
                            className={`flex ${rtlDirection} h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${rtlAlign}`}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={rtlAlign}>{t('preferredLanguage')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger className={rtlAlign}>
                          <SelectValue placeholder={t('selectLanguage')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ENGLISH">{t('ENGLISH')}</SelectItem>
                        <SelectItem value="ARABIC">{t('ARABIC')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className={rtlAlign} />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('marketingPreferences')}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="newsletterSubscribed"
              render={({ field }) => (
                <FormItem className={`flex flex-row items-start space-x-3 space-y-0 ${rtlDirection}`}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className={rtlAlign}>
                      {t('newsletterSubscription')}
                    </FormLabel>
                    <FormDescription className={rtlAlign}>
                      {t('newsletterDescription')}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={updateUserMutation.isPending}>
          {updateUserMutation.isPending ? t('saving') : t('saveChanges')}
        </Button>
      </form>
    </Form>
  )
}