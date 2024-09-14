// @/schemas/orderSchema.ts

export interface OrderItemData {
    productId: number;
    productVariationId: number;
    quantity: number;
    price: number;
    addons?: {
      addonId: number;
      addonVariationId: number;
      quantity: number;
      price: number;
    }[];
  }
  
  export interface OrderFormData {
    items: OrderItemData[];
    shippingAddressId?: number;
    customerEmail: string;
    customerPhone: string;
    customerName: string;
    isAnonymous: boolean;
    cardMessage?: string;
    couponCode?: string;
  }