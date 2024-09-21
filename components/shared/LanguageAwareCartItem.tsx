'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getProductBySlug } from '@/data/products'
import { Product, ProductVariation } from '@/types/product'
import { CartItem } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import { useRTLAwareStyle } from '@/util/rtl'
import { TableCell, TableRow } from "@/components/ui/table"

interface LanguageAwareCartItemProps {
  item: CartItem
  currentLang: 'en' | 'ar'
  variant: 'sheet' | 'page' | 'summary'
  onQuantityChange?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
  formatPrice: (price: number) => string
}

export function LanguageAwareCartItem({
  item,
  currentLang,
  variant,
  onQuantityChange,
  onRemove,
  formatPrice
}: LanguageAwareCartItemProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [variation, setVariation] = useState<ProductVariation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations('cart')
  const rtlAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')
  const rtlDirection2 = useRTLAwareStyle('', 'w-full flex flex-row-reverse justify-between items-center')
  const rtlMargin = useRTLAwareStyle('ml-4', 'mr-4')
  const rtlText = useRTLAwareStyle('', 'text-right')
  const rtlRow = useRTLAwareStyle('md:flex-row','md:flex-row-reverse')

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true)
      const fetchedProduct = await getProductBySlug(item.variation.product.slug, currentLang)
      if (fetchedProduct) {
        setProduct(fetchedProduct)
        const matchingVariation = fetchedProduct.variations.find(v => v.id === item.variationId)
        if (matchingVariation) {
          setVariation(matchingVariation)
        }
      }
      setIsLoading(false)
    }

    fetchProduct()
  }, [item, currentLang])




  if (isLoading) {
    if (variant === 'page') return <TableRow><TableCell colSpan={4}>{t('loading')}</TableCell></TableRow>
    return <div>{t('loading')}</div>
  }

  if (!product || !variation) {
    if (variant === 'page') return <TableRow><TableCell colSpan={4}>{t('productNotFound')}</TableCell></TableRow>
    return <div>{t('productNotFound')}</div>
  }

  const renderQuantityControls = () => (
    <div className="flex items-center justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onQuantityChange?.(item.id, Math.max(1, item.quantity - 1))}
        className="h-8 w-8"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="mx-2">{item.quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
        className="h-8 w-8"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )

  const renderRemoveButton = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onRemove?.(item.id)}
      className="text-muted-foreground"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">{t('remove')}</span>
    </Button>
  )

  const renderAddons = () => (
    item.addons.length > 0 && (
      <div className={`mt-2 ${rtlAlign}`}>
        <h4 className="text-xs md:text-sm font-medium">{t('addons')}:</h4>
        {item.addons.map((addon) => (
          <div key={addon.id} className="text-xs md:text-sm text-gray-500">
            {addon.name} ({addon.addonType}) - {formatPrice((addon.price || 0) * (addon.quantity || 1))}
          </div>
        ))}
      </div>
    )
  )

  const sheetContent = (
    <div className={`relative flex flex-col py-6 ${rtlDirection}`}>
      <div className={`flex ${rtlDirection}`}>
        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border">
          <Image
            src={variation.image?.url || '/placeholder.svg'}
            alt={product.name}
            width={96}
            height={96}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className={`${rtlMargin} flex-1 flex flex-col ${rtlAlign}`}>
          <div>
            <div className={`${rtlDirection} flex justify-between text-base font-medium`}>
              <h3>{product.name}</h3>
              <p>{formatPrice(variation.price * item.quantity)}</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {variation.size?.name} - {variation.infinityColor?.name}
            </p>
          </div>
          <div className="flex-1 flex items-end justify-between text-sm">
            {renderQuantityControls()}
            {renderRemoveButton()}
          </div>
        </div>
      </div>
      {renderAddons()}
    </div>
  )

  const pageContent = (
    <TableRow className={rtlDirection2}>
      <TableCell className="font-medium">
        <div className={`flex items-start space-x-3 ${rtlDirection}`}>
          <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-md overflow-hidden`}>
            <Image
              src={variation.image?.url || '/placeholder.svg'}
              alt={product.name}
              width={80}
              height={80}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div>
            <h3 className={`text-sm md:text-base font-medium text-gray-900 ${rtlText}`}>{product.name}</h3>
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              {variation.size?.name && `${t('size')}: ${variation.size.name}, `}
              {variation.infinityColor?.name && `${t('color')}: ${variation.infinityColor.name}, `}
              {variation.boxColor?.name && `${t('box')}: ${variation.boxColor.name}, `}
              {variation.wrappingColor?.name && `${t('wrapping')}: ${variation.wrappingColor.name}`}
            </p>
            {renderAddons()}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {renderQuantityControls()}
      </TableCell>
      <TableCell className="text-right hidden md:table-cell">{formatPrice(variation.price)}</TableCell>
      <TableCell className="text-right">
        <div className={`flex flex-col ${rtlRow} justify-end items-end md:items-center`}>
          <span className="font-medium mb-2 md:mb-0 md:mr-2">{formatPrice(variation.price * item.quantity)}</span>
          {renderRemoveButton()}
        </div>
      </TableCell>
    </TableRow>
  )

  const summaryContent = (
    <div className="flex space-x-4">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={variation.image?.url || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {variation.size?.name && `${t('size')}: ${variation.size.name}, `}
          {variation.infinityColor?.name && `${t('color')}: ${variation.infinityColor.name}, `}
          {variation.boxColor?.name && `${t('box')}: ${variation.boxColor.name}, `}
          {variation.wrappingColor?.name && `${t('wrapping')}: ${variation.wrappingColor.name}`}
        </p>
        {renderAddons()}
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm">{t('quantity')}: {item.quantity}</span>
          <span className="font-semibold">
            {formatPrice(variation.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )

  switch (variant) {
    case 'sheet':
      return sheetContent
    case 'page':
      return pageContent
    case 'summary':
      return summaryContent
    default:
      return null
  }
}