'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import CartSheet from "../shared/CartSheet";
import { useCartStore } from '@/store/cartStore';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from "@/util/rtl";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const SubtleLoader = () => (
  <div className="flex items-center space-x-2">
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
);

const CartItemCount = () => {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartItemCount);
  }, [cartItemCount]);

  if (count === 0) return null;

  return (
    <span className="absolute top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
      {count}
    </span>
  );
};

export function IconWithTooltip({
  item,
  index,
  handleAccountClick
}: {
  item: { icon: React.ReactNode; text: string; badge?: boolean };
  index: number;
  handleAccountClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('common');
  const rtlAwareStyle = useRTLAwareStyle('left-1/2', 'right-1/2');
  const rtlAwareTransform = useRTLAwareStyle('-translate-x-1/2', 'translate-x-1/2');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderTooltip = () => {
    if (!isHovered) return null;

    return (
      <span 
        className={`absolute top-full ${rtlAwareStyle} transform ${rtlAwareTransform} bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap`}
      >
        {item.text}
      </span>
    );
  };

  if (!isMounted) {
    return <SubtleLoader />;
  }

  if (item.text === t('header.viewCart')) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative p-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {item.icon}
            <span className="sr-only">{t('header.viewCart')}</span>
            {item.badge && <CartItemCount />}
            {renderTooltip()}
          </Button>
        </SheetTrigger>
        <VisuallyHidden.Root>
          <SheetTitle>{t('cart.cart')}</SheetTitle>
          <SheetDescription>{t('cart.cartDescription')}</SheetDescription>
        </VisuallyHidden.Root>
        <SheetContent side={t('lang.name') === 'العربية' ? 'left' : 'right'}>
          <CartSheet />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Button
      variant="ghost"
      className="relative p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={item.text === t('header.account') ? handleAccountClick : undefined}
    >
      {item.icon}
      <span className="sr-only">{item.text}</span>
      {renderTooltip()}
    </Button>
  );
}

export default IconWithTooltip;