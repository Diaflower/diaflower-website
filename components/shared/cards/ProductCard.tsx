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
  const letterSpacing = useRTLAwareStyle('tracking-widest','')

  return (
    <Link href={`/products/${product.slug}`} passHref className="block group relative w-full overflow-hidden border border-transparent transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg">
      <div className="relative h-[230px] md:h-[350px] w-full overflow-hidden">
        <Image
          src={product.image.url}
          alt={product.image.altText}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={100}
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className={`text-xl font-bold ${letterSpacing}`}>{product.name}</h3>
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-base font-semibold font-roboto">
            {t('from')} {t('currency', { amount: product.price })}
          </span>
          <Button className={`w-full rounded-none bg-darGreyy text-white transition-colors duration-300 ease-in-out md:bg-transparent md:text-darGreyy md:group-hover:bg-darGreyy md:group-hover:text-white ${letterSpacing}`}>
            {t('moreDetails')}
          </Button>
        </div>
      </div>
    </Link>
  );
}