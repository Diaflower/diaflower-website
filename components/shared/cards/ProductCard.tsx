// components/ProductCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SimpleProduct } from "@/types/product";
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from "@/util/rtl";
import Link from "next/link";

interface ProductCardProps {
  product: SimpleProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('product');
  const rtlAwareStyle = useRTLAwareStyle('left-0', 'right-0');

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image.url}
          alt={product.image.altText}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className={`absolute bottom-0 ${rtlAwareStyle} w-full bg-gradient-to-t from-black to-transparent p-4`}>
          <h3 className="text-lg font-bold text-white">{product.name}</h3>
          <span className="text-xl font-bold text-white">{t('currency', { value: product.price })}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link href={`/product/${product.id}`} passHref>
          <Button className="bg-white text-black hover:bg-gray-200">
            {t('moreDetails')}
          </Button>
        </Link>
      </div>
    </div>
  );
}