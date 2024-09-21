// store/cartStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductVariation, AddonVariation } from '@/types/product';

interface CartAddon extends AddonVariation {
  addonType: string;
  name: string;
  variationId: number;
}

export interface CartItem {
  id: string;
  productId: number;
  productSlug: string;
  variationId: number;
  variation: ProductVariation;
  quantity: number;
  addons: CartAddon[];
  lang: 'en' | 'ar';
}

export type CartItemInput = Omit<CartItem, 'id'>;

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItemInput) => void;
  addAddonToItem: (item: CartItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item: CartItemInput) => set((state) => {
        const existingItem = state.items.find(
          (i) => 
            i.productId === item.productId && 
            i.variationId === item.variationId
          // Removed the language check
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === existingItem.id 
                ? { 
                    ...i, 
                    quantity: i.quantity + item.quantity,
                    lang: item.lang // Update the language to the most recent one
                  } 
                : i
            ),
          };
        }
        const newItem: CartItem = { ...item, id: Date.now().toString() };
        return { items: [...state.items, newItem] };
      }),
      addAddonToItem: (item: CartItemInput) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => 
            i.productId === item.productId && 
            i.variationId === item.variationId
          // Removed the language check
        );
        
        if (existingItemIndex === -1) {
          // Item doesn't exist, add new item with addons
          const newItem: CartItem = { ...item, id: Date.now().toString() };
          return { items: [...state.items, newItem] };
        }

        // Item exists, update addons and language
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        
        existingItem.lang = item.lang; // Update the language

        item.addons.forEach((newAddon) => {
          const existingAddonIndex = existingItem.addons.findIndex((a) => a.id === newAddon.id);
          if (existingAddonIndex !== -1) {
            // Addon exists, update quantity
            existingItem.addons[existingAddonIndex] = {
              ...existingItem.addons[existingAddonIndex],
              quantity: (existingItem.addons[existingAddonIndex].quantity || 1) + (newAddon.quantity || 1)
            };
          } else {
            // New addon, add to the list
            existingItem.addons.push({ ...newAddon, quantity: newAddon.quantity || 1 });
          }
        });

        return { items: updatedItems };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const itemTotal = item.variation.price * item.quantity;
          const addonTotal = item.addons.reduce((sum, addon) => sum + (addon.price * (addon.quantity || 1)), 0);
          return total + itemTotal + addonTotal;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);