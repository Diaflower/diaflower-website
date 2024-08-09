import React from 'react';
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartSheet: React.FC = () => {
  // This is just dummy data. In a real app, you'd manage this with state or context.
  const cartItems: CartItem[] = [
    { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          You have {cartItems.length} item(s) in your cart
        </SheetDescription>
      </SheetHeader>
      
      <div className="flex-grow overflow-auto py-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
      
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Total:</h3>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};

export default CartSheet;