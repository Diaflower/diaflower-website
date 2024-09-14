'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from '@/hooks/use-toast'
import { Pencil, Trash2, PlusIcon } from 'lucide-react'
import { AddressFormData } from '@/schemas/addressSchema'
import { fetchAddresses, createAddress, updateAddress, deleteAddress } from '@/data/address'
import { useAuth } from '@clerk/nextjs'
import { ResponsiveDialog } from '@/components/shared/ResponsiveDialog'
import AddressForm from "./AddressForm"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

export default function AddressesForm({ lang }: { lang: string }) {
  const { isLoaded, userId, getToken } = useAuth()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressFormData | null>(null)
  const t = useTranslations('account')
  const rtlMargin = useRTLAwareStyle('mr-2', 'ml-2')
  
  const rtlTextAlign = useRTLAwareStyle('text-left', 'text-right')

  const { data: addresses, isLoading, isError } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return fetchAddresses(token)
    },
    enabled: isLoaded && !!userId,
  })

  const mutation = useMutation({
    mutationFn: async ({ action, data }: { action: 'create' | 'update' | 'delete', data: AddressFormData }) => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      switch (action) {
        case 'create': return createAddress(token, data)
        case 'update': return updateAddress(token, data)
        case 'delete': return deleteAddress(token, data.id!)
      }
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
      toast({
        title: t(`address${action.charAt(0).toUpperCase() + action.slice(1)}Success`),
        description: t(`address${action.charAt(0).toUpperCase() + action.slice(1)}Description`),
      })
      setOpen(false)
    },
    onError: (error, { action }) => {
      toast({
        title: t('error'),
        description: t('addressActionError', { action }),
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (data: AddressFormData) => {
    mutation.mutate({ action: selectedAddress ? 'update' : 'create', data })
  }

  const handleDelete = (id: number) => {
    if (window.confirm(t('confirmDeleteAddress'))) {
      mutation.mutate({ action: 'delete', data: { id } as AddressFormData })
    }
  }

  const handleEdit = (address: AddressFormData) => {
    setSelectedAddress(address)
    setOpen(true)
  }

  const handleAdd = () => {
    setSelectedAddress(null)
    setOpen(true)
  }

  if (isLoading) return <div>{t('loadingAddresses')}</div>
  if (isError) return <div>{t('errorLoadingAddresses')}</div>

  return (
    <div className={`space-y-6`}>
      <div className="flex justify-between items-center">
        {addresses && addresses.length > 0 &&
          <Button onClick={handleAdd}>
            <PlusIcon className={rtlMargin} /> {t('addNewAddress')}
          </Button>
        }
      </div>
      
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title={selectedAddress ? t('editAddress') : t('addNewAddress')}
      >
        <AddressForm selectedAddress={selectedAddress} onSubmit={handleSubmit} className="pb-8" lang={lang} />
      </ResponsiveDialog>
      
      {addresses && addresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address: AddressFormData) => (
            <Card key={address.id}>
              <CardContent className={`pt-6`}>
                <h3 className={`font-semibold mb-2 ${rtlTextAlign}`}>{address.addressTitle}</h3>
                {address.isDefault && (
                  <span className={`text-sm text-muted-foreground mb-2 block ${rtlTextAlign}`}>{t('defaultAddress')}</span>
                )}
                <p className={rtlTextAlign}>{t(address.title)} {address.firstName} {address.lastName}</p>
                <p className={rtlTextAlign}>{address.addressLine1}</p>
                <p className={rtlTextAlign}>{address.area}, {t(address.state)}, {t(address.country)}</p>
                <p className={rtlTextAlign}>{address.postalCode}</p>
                <p className={rtlTextAlign}>{address.phone}</p>
                <div className={`flex justify-end mt-4 ${lang === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(address)}>
                    <Pencil className={rtlMargin} /> {t('edit')}
                  </Button>
                  {address.id && (
                    <Button variant="outline" size="sm" onClick={() => handleDelete(address.id!)}>
                      <Trash2 className={rtlMargin} /> {t('delete')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground mb-4">{t('noAddresses')}</p>
            <Button onClick={handleAdd}>
              <PlusIcon className={rtlMargin} /> {t('addNewAddress')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}