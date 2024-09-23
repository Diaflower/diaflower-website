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
    <div className="group relative w-full overflow-hidden rounded-lg border border-transparent transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg">
      <div className="relative h-[230px] md:h-[300px] w-full overflow-hidden">
        <Image
          src={product.image.url}
          alt={product.image.altText}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-xl font-bold">
            {t('from')} {t('currency', { amount: product.price })}
          </span>
          <Link href={`/products/${product.slug}`} passHref className="w-full">
            <Button className="w-full rounded-md bg-black text-white transition-colors duration-300 ease-in-out md:bg-transparent md:text-black md:hover:bg-black md:hover:text-white">
              {t('moreDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}