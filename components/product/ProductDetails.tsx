'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Minus, Plus, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Product, ProductVariation, ProductSize, Color, Addon, AddonVariation } from '@/types/product'
import { CartItemInput, useCartStore } from '@/store/cartStore'
import { toast } from '@/hooks/use-toast'
import { useRTLAwareStyle } from '@/util/rtl'
import { useTranslations } from 'next-intl'
import AnimatedImage from '../shared/AnimatedImage'

const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  return parseFloat(price) || 0;
}

export default function ProductDetails({ product, lang}: { product: Product, lang: 'en' | 'ar'}) {
  const t = useTranslations('product');
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(
    product.variations.find(v => v.isDefault) || product.variations[0]
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedAddons, setSelectedAddons] = useState<Record<number, AddonVariation>>({})
  const { addItem, addAddonToItem } = useCartStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const rtlDirection = useRTLAwareStyle('', 'flex-row-reverse')
  const rtlText = useRTLAwareStyle('', 'text-right')
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')

 
  const handleVariationChange = (variation: ProductVariation) => {
    setSelectedVariation(variation)
    const index = product.variations.findIndex(v => v.id === variation.id)
    if (index !== -1) {
      setCurrentImageIndex(index)
    }
  }
  
  useEffect(() => {
    const variation = product.variations[currentImageIndex]
    if (variation) {
      handleVariationChange(variation)
    }
  }, [currentImageIndex ,product.variations])

  
  const handleAddonChange = (addon: Addon, variation: AddonVariation | null) => {
    setSelectedAddons(prev => {
      if (variation === null) {
        const { [addon.id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [addon.id]: variation }
    })
  }

  const handleAddToCart = (withAddons: boolean) => {
    const cartItem: CartItemInput = {
    lang: lang,
    productSlug: product.slug,
    productId: product.id,
    variationId: selectedVariation.id,
    variation: {
      ...selectedVariation,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
      },
    },
    quantity: quantity,
    addons: withAddons ? Object.values(selectedAddons).map(addon => ({
      ...addon,
      addonType: product.addons.find(a => a.addonVariations.some(v => v.id === addon.id))?.addonType || '',
      name: product.addons.find(a => a.addonVariations.some(v => v.id === addon.id))?.name || '',
      variationId: addon.id // Add this line
    })) : [],
  };

    if (withAddons) {
      addAddonToItem(cartItem);
      toast({
        title: t('addedToCartWithAddons'),
        description: t('addedToCartWithAddonsDescription', { name: product.name }),
      });
    } else {
      addItem(cartItem);
      toast({
        title: t('addedToCart'),
        description: t('addedToCartDescription', { quantity, name: product.name }),
      });
    }
  }

  const renderOptions = (
    optionType: 'size' | 'infinityColor' | 'boxColor' | 'wrappingColor',
    product: { variations: ProductVariation[] },
    selectedVariation: ProductVariation,
    handleVariationChange: (variation: ProductVariation) => void,
    t: (key: string, params?: Record<string, string>) => string
  ) => {
    const options = product.variations.reduce((acc, variation) => {
      const option = variation[optionType];
      if (option && typeof option === 'object' && 'id' in option) {
        const isSize = 'name' in option && !('image' in option);
        const isColor = 'image' in option;
        
        if ((isSize && optionType === 'size') || (isColor && optionType !== 'size')) {
          const existingOption = acc.find(item => 
            isSize 
              ? (item as ProductSize).name === (option as ProductSize).name
              : item.id === option.id
          );
          
          if (!existingOption) {
            acc.push(option as ProductSize | Color);
          }
        }
      }
      return acc;
    }, [] as (ProductSize | Color)[]);
  
    if (options.length === 0) {
      return null;
    }
  
    if (optionType === 'size') {
      return (
        <RadioGroup
          value={selectedVariation[optionType]?.id.toString()}
          onValueChange={(value) => {
            const newVariation = product.variations.find(v => v[optionType]?.id.toString() === value);
            if (newVariation) handleVariationChange(newVariation);
          }}
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 gap-1 rtl:space-x-reverse">
              <RadioGroupItem value={option.id.toString()} id={`size-${option.id}`} />
              <Label htmlFor={`size-${option.id}`}>{(option as ProductSize).name}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    } else {
      return (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const colorOption = option as Color;
            return (
              <button
                key={colorOption.id}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedVariation[optionType]?.id === colorOption.id ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => {
                  const newVariation = product.variations.find(v => v[optionType]?.id === colorOption.id);
                  if (newVariation) handleVariationChange(newVariation);
                }}
                aria-label={t(`select${optionType.charAt(0).toUpperCase() + optionType.slice(1)}`, { color: colorOption.name })}
              >
                <Image
                  src={colorOption.image?.url || '/placeholder.svg?height=40&width=40'}
                  alt={colorOption.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            );
          })}
        </div>
      );
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parsePrice(selectedVariation.price) * quantity
    const addonsPrice = Object.values(selectedAddons).reduce((sum, addon) => sum + parsePrice(addon.price), 0)
    return basePrice + addonsPrice
  }

  const addonTypes = useMemo(() => {
    return Array.from(new Set(product.addons.map(addon => addon.addonType)))
  }, [product.addons])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`grid md:grid-cols-2 gap-8 ${rtlDirection} pb-20`}>
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <AnimatedImage
            quality={100}
              thumbnailSrc = {selectedVariation.image?.thumbnail || product.mainImage.thumbnail}
              mainSrc={selectedVariation.image?.url || product.mainImage.url}
              alt={selectedVariation.image?.altText || product.mainImage.altText || product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="flex justify-center">
                {product.variations.map((variation, index) => (
                  <CarouselItem key={variation.id} className="basis-1/5 sm:basis-1/6 md:basis-1/7 lg:basis-1/8">
                    <div className="p-1">
                      <button
                        className={`relative w-full aspect-square rounded-md overflow-hidden ${
                          currentImageIndex === index ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={variation.image?.url || product.mainImage.url}
                          alt={variation.image?.altText || product.mainImage.altText || product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold" aria-live="polite">
              {t('currency', { amount: parsePrice(selectedVariation.price).toFixed(2) })}
              {selectedVariation.previousPrice && (
                <span className="ml-2 text-sm line-through text-gray-500">
                  {t('wasCurrency', { amount: parsePrice(selectedVariation.previousPrice).toFixed(2) })}
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button> */}
              <div className="flex items-center border border-darGreyy rounded-md">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8"
                  aria-label={t('decreaseQuantity')}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-darGreyy">{quantity}</span>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8"
                  aria-label={t('increaseQuantity')}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className='text-sm text-gray-600'>{product.shortDescription}</p>
        
          {(['size', 'infinityColor', 'boxColor', 'wrappingColor'] as const).map((optionType) => {
            const options = renderOptions(optionType, product, selectedVariation, handleVariationChange, t);
            if (options) {
              return (
                <div key={optionType} className="space-y-2">
                  <h2 className={`text-sm md:text-base font-semibold uppercase ${letterSpacing}`}>{t(optionType)}</h2>
                  {options}
                </div>
              );
            }
            return null;
          })}

          <Button 
            className="w-full bg-darGreyy hover:bg-darGreyy/90 text-white rounded-md flex items-center justify-center space-x-2 rtl:space-x-reverse py-6"
            onClick={() => handleAddToCart(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{t('addToCart')}</span>
          </Button> 
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <h3 className={`text-sm font-semibold text-darGreyy mb-2 ${letterSpacing}`}>{t('shareWithFriend')}</h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Button variant="outline" size="icon" className='border-darGreyy'>
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className='border-darGreyy'>
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className='border-darGreyy'>
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className='border-darGreyy'>
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="flowerDeliveryInfo">
                <AccordionTrigger className={`text-darGreyy ${letterSpacing}`}>{t('flowerDeliveryInfo')}</AccordionTrigger>
                <AccordionContent className='text-gray-600'>
                  {t('flowerDeliveryInfoContent')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="disclaimer" className={`text-darGreyy ${letterSpacing}`}>
                <AccordionTrigger>{t('disclaimer')}</AccordionTrigger>
                <AccordionContent className='text-gray-600'>
                  {t('disclaimerContent')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ourFlowers" className={`text-darGreyy ${letterSpacing}`}>
                <AccordionTrigger>{t('ourFlowers')}</AccordionTrigger>
                <AccordionContent className= 'text-gray-600'>
                  {t('ourFlowersContent')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
  
      {addonTypes.length > 0 && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">{t('enhanceYourOrder')}</h2>
          <Tabs defaultValue={addonTypes[0].toLowerCase()} className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent border-b">
              {addonTypes.map((type) => (
                <TabsTrigger 
                  key={type} 
                  value={type.toLowerCase()}
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {t(`addonType.${type.toLowerCase()}`)}
                </TabsTrigger>
              ))}
            </TabsList>
            {addonTypes.map((addonType) => (
              <TabsContent key={addonType} value={addonType.toLowerCase()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.addons
                    .filter(addon => addon.addonType === addonType)
                    .map(addon => {
                      const selectedVariation = selectedAddons[addon.id]
                      const defaultImage = addon.addonVariations[0]?.image?.url || addon.mainImage?.url
                      return (
                        <Card key={addon.id}>
                          <CardContent className="p-4 space-y-4">
                            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                              <Image
                                src={selectedVariation?.image?.url || defaultImage || '/placeholder.svg?height=200&width=200'}
                                alt={addon.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className={`font-semibold ${rtlText}`}>{addon.name}</h3>
                              <p className={`text-sm text-gray-600 line-clamp-2 ${rtlText}`}>{addon.description}</p>
                            </div>
                            {addon.addonVariations.length > 0 ? (
                              <select
                                className={`w-full border rounded-md p-2 text-sm ${rtlText}`}
                                onChange={(e) => {
                                  const selectedVariation = addon.addonVariations.find(v => v.id === parseInt(e.target.value))
                                  handleAddonChange(addon, selectedVariation || null)
                                }}
                                value={selectedAddons[addon.id]?.id || ''}
                              >
                                <option value="">{t('selectOption')}</option>
                                {addon.addonVariations.map(variation => (
                                  <option key={variation.id} value={variation.id}>
                                    {variation.size?.name} - {t('currency', { amount: parsePrice(variation.price).toFixed(2) })}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <p className="text-sm font-semibold">
                                {t('currency', { amount: parsePrice(addon.addonVariations[0]?.price || 0).toFixed(2) })}
                              </p>
                            )}
                            <div className="flex items-center">
                              <Checkbox
                                id={`addon-${addon.id}`}
                                checked={!!selectedAddons[addon.id]}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    const defaultVariation = addon.addonVariations.find(v => v.isDefault) || addon.addonVariations[0]
                                    handleAddonChange(addon, defaultVariation)
                                  } else {
                                    handleAddonChange(addon, null)
                                  }
                                }}
                              />
                              <label
                                htmlFor={`addon-${addon.id}`}
                                className="ml-2 rtl:mr-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t('addToOrder')}
                              </label>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xl font-semibold">
              {t('total')}: {t('currency', { amount: calculateTotalPrice().toFixed(2) })}
            </p>
            <Button 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-md flex items-center justify-center space-x-2 rtl:space-x-reverse px-6 py-3"
              onClick={() => handleAddToCart(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{t('addToCartWithAddons')}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}