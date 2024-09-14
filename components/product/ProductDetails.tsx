'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Product, ProductVariation, ProductSize, Color, Addon, AddonVariation } from '@/types/product'
import { Facebook, Instagram, Twitter, Mail, Minus, Plus, ShoppingCart, Heart } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartItemInput, useCartStore } from '@/store/cartStore'
import { toast } from '@/hooks/use-toast'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  return parseFloat(price) || 0;
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(
    product.variations.find(v => v.isDefault) || product.variations[0]
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedAddons, setSelectedAddons] = useState<Record<number, AddonVariation>>({})
  const { addItem, addAddonToItem } = useCartStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // console.log("prorddd",product)
  useEffect(() => {
    const variation = product.variations[currentImageIndex]
    if (variation) {
      handleVariationChange(variation)
    }
  }, [currentImageIndex])

  const handleVariationChange = (variation: ProductVariation) => {
    setSelectedVariation(variation)
    // Update the main image index
    const index = product.variations.findIndex(v => v.id === variation.id)
    if (index !== -1) {
      setCurrentImageIndex(index)
    }
  }
  
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
      productId: product.id,
      variationId: selectedVariation.id,
      variation: {
        ...selectedVariation,
        product: {
          id: product.id,
          name_en: product.name_en,
          name_ar: product.name_ar,
        },
      },
      quantity: quantity,
      addons: withAddons ? Object.values(selectedAddons).map(addon => ({
        ...addon,
        addonType: product.addons.find(a => a.addonVariations.some(v => v.id === addon.id))?.addonType || '',
        name_en: product.addons.find(a => a.addonVariations.some(v => v.id === addon.id))?.name_en || '',
      })) : [],
    };

    if (withAddons) {
      addAddonToItem(cartItem);
      toast({
        title: "Product and addons added to cart",
        description: `${product.name_en} with selected addons added to your cart.`,
      });
    } else {
      addItem(cartItem);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name_en} added to your cart.`,
      });
    }
  }

  const renderOptions = (key: 'size' | 'infinityColor' | 'boxColor' | 'wrappingColor') => {
    const uniqueOptions = product.variations.reduce((acc, variation) => {
      const option = variation[key]
      if (option) {
        const isDuplicate = acc.some(item => 
          key === 'size' 
            ? (item as ProductSize).name_en === (option as ProductSize).name_en
            : item.id === option.id
        )
        if (!isDuplicate) {
          acc.push(option)
        }
      }
      return acc
    }, [] as (ProductSize | Color)[])
    if (key === 'size') {
      return (
        <RadioGroup
          value={selectedVariation[key]?.id.toString()}
          onValueChange={(value) => {
            const newVariation = product.variations.find(v => v[key]?.id.toString() === value)
            if (newVariation) handleVariationChange(newVariation)
          }}
          className="flex flex-wrap gap-2"
        >
          {uniqueOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id.toString()} id={`size-${option.id}`} />
              <Label htmlFor={`size-${option.id}`}>{(option as ProductSize).name_en}</Label>
            </div>
          ))}
        </RadioGroup>
      )
    } else {
      return (
        <div className="flex flex-wrap gap-2">
          {uniqueOptions.map((option) => {
            const colorOption = option as Color
            return (
              <button
                key={colorOption.id}
                className={`w-10 h-10 rounded-full border-2 ${selectedVariation[key]?.id === colorOption.id ? "border-primary" : "border-gray-200"}`}
                onClick={() => {
                  const newVariation = product.variations.find(v => v[key]?.id === colorOption.id)
                  if (newVariation) handleVariationChange(newVariation)
                }}
                aria-label={`Select ${key} ${colorOption.name_en}`}
              >
                <Image
                  src={colorOption.image?.url || '/placeholder.svg?height=40&width=40'}
                  alt={colorOption.name_en}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            )
          })}
        </div>
      )
    }
  }

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
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={selectedVariation.image?.url || product.mainImage.url}
              alt={selectedVariation.image?.altText_en || product.mainImage.altText_en || product.name_en}
             fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Smaller carousel */}
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
                          alt={variation.image?.altText_en || product.mainImage.altText_en || product.name_en}
                          fill
                          className="object-cover"
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
          <h1 className="text-3xl font-bold">{product.name_en}</h1>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold" aria-live="polite">
              AED {parsePrice(selectedVariation.price).toFixed(2)}
              {selectedVariation.previousPrice && (
                <span className="ml-2 text-sm line-through text-gray-500">
                  Was AED {parsePrice(selectedVariation.previousPrice).toFixed(2)}
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className='text-sm text-gray-600'>{product.shortDescription_en}</p>
          <div className="space-y-4">
            {product.productType === 'LONG_LIFE' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Size</h2>
                  {renderOptions('size')}
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Infinity Color</h2>
                  {renderOptions('infinityColor')}
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Box Color</h2>
                  {renderOptions('boxColor')}
                </div>
              </>
            )}
            {product.productType === 'BOUQUET' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Size</h2>
                  {renderOptions('size')}
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Wrapping Color</h2>
                  {renderOptions('wrappingColor')}
                </div>
              </>
            )}
            {product.productType === 'ARRANGEMENT' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Size</h2>
                  {renderOptions('size')}
                </div>
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold uppercase">Box Color</h2>
                  {renderOptions('boxColor')}
                </div>
              </>
            )}
            {product.productType === 'ACRYLIC_BOX' && (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase">Size</h2>
                {renderOptions('size')}
              </div>
            )}
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-md flex items-center justify-center space-x-2 py-6"
            onClick={() => handleAddToCart(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>ADD TO CART</span>
          </Button> 
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">SHARE WITH A FRIEND</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="flowerDeliveryInfo">
                <AccordionTrigger>Flower Delivery Info</AccordionTrigger>
                <AccordionContent>
                  Our flower delivery service is available in Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain and Fujairah.
                  When you order flowers online, we will ensure that you receive your flowers within the delivery time slot you've selected.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="disclaimer">
                <AccordionTrigger>Disclaimer</AccordionTrigger>
                <AccordionContent>
                  Disclaimer content goes here.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ourFlowers">
                <AccordionTrigger>Our Flowers</AccordionTrigger>
                <AccordionContent>
                  Information about our flowers goes here.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
  
      {/* Enhance Your Order Section */}
      {addonTypes.length > 0 && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Enhance Your Order</h2>
          <Tabs defaultValue={addonTypes[0].toLowerCase()} className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent border-b">
              {addonTypes.map((type) => (
                <TabsTrigger 
                  key={type} 
                  value={type.toLowerCase()}
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {type}
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
                                alt={addon.name_en}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{addon.name_en}</h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{addon.description_en}</p>
                            </div>
                            {addon.addonVariations.length > 0 ? (
                              <select
                                className="w-full border rounded-md p-2 text-sm"
                                onChange={(e) => {
                                  const selectedVariation = addon.addonVariations.find(v => v.id === parseInt(e.target.value))
                                  handleAddonChange(addon, selectedVariation || null)
                                }}
                                value={selectedAddons[addon.id]?.id || ''}
                              >
                                <option value="">Select option</option>
                                {addon.addonVariations.map(variation => (
                                  <option key={variation.id} value={variation.id}>
                                    {variation.size?.name_en} - AED {parsePrice(variation.price).toFixed(2)}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <p className="text-sm font-semibold">
                                AED {parsePrice(addon.addonVariations[0]?.price || 0).toFixed(2)}
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
                                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Add to order
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
              Total: AED {calculateTotalPrice().toFixed(2)}
            </p>
            <Button 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-md flex items-center justify-center space-x-2 px-6 py-3"
              onClick={() => handleAddToCart(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO CART WITH ADDONS</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
