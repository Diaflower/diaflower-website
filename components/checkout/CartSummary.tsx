'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export function CartSummary() {
  const { items, getTotalPrice } = useCartStore()
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')

  const subtotal = getTotalPrice()
  const shipping = 0 // You may want to calculate this based on your business logic
  const taxes = 0 // You may want to calculate this based on your business logic
  const total = subtotal + shipping + taxes

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    console.log('Applying coupon:', couponCode)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>In your Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>AED {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Taxes</span>
            <span>AED {taxes.toFixed(2)}</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>AED {total.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.variation.image?.url || '/placeholder.svg'}
                  alt={item.variation.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.variation.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.variation.product.name && `Variant: ${item.variation.product.name}`}
                  {item.variation.size && `, Size: ${item.variation.size}`}
                  {item.variation.boxColor && `, Box: ${item.variation.boxColor}`}
                  {item.variation.infinityColor && `, Infinity: ${item.variation.infinityColor}`}
                  {item.variation.wrappingColor && `, Wrapping: ${item.variation.wrappingColor}`}
                </p>
                {item.addons.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Addons: {item.addons.map(addon => addon.name).join(', ')}
                  </div>
                )}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-semibold">AED {(item.variation.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div>
          <Button
            variant="link"
            className="p-0 h-auto font-normal text-primary"
            onClick={() => setShowCouponInput(!showCouponInput)}
          >
            {showCouponInput ? (
              <>
                <ChevronUpIcon className="w-4 h-4 mr-1" />
                Hide gift card or discount code
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4 mr-1" />
                Add gift card or discount code
              </>
            )}
          </Button>
          {showCouponInput && (
            <div className="flex space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleApplyCoupon}>Apply</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}