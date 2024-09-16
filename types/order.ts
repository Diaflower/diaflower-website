// src/types.ts

import { Addon, AddonVariation, Product, ProductVariation } from "./product";

export interface OrderItemAddon {
  id: number;
  addonId: number;
  addonVariationId: number;
  quantity: number;
  price: string;
  addon: Addon;
  addonVariation: AddonVariation;
}


export interface OrderItem {
  id: number;
  productId: number;
  productVariationId: number;
  quantity: number;
  price: string;
  product: Product;
  productVariation: ProductVariation;
  addons: OrderItemAddon[];
}
  
export interface ShippingAddress {
  id: number;
  addressLine1: string;
  area?: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface Order {
  id: string;
  status: string;
  total: string;
  subtotal: string;
  taxInfo: string;
  shippingCost: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export interface OrdersResponse {
  items: Order[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
}