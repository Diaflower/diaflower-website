'use client'

import { useCartStore, CartItem } from '@/store/cartStore'
import { LanguageAwareCartItem } from './LanguageAwareCartItem'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface CartItemsProps {
  variant: 'sheet' | 'page' | 'summary'
}

export function CartContent({ variant }: CartItemsProps) {
  const { items, removeItem, updateQuantity } = useCartStore()
  const params = useParams()
  const lang = (params?.lang as 'en' |'ar') || 'en'
  const t = useTranslations('cart')

  const formatPrice = (price: number) => t('currency', { amount: (+price).toFixed(2) })

  return (
    <>
      {items.map((item: CartItem) => (
        <LanguageAwareCartItem
          key={item.id}
          item={item}
          currentLang={lang}
          variant={variant}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
          formatPrice={formatPrice}
        />
      ))}
    </>
  )
}