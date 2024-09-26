'use client'

import { getProductsByTag } from '@/data/products';
import { SimpleProduct } from '@/types/product';
import ProductCard from './cards/ProductCard';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from '@/util/rtl';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface ProductListProps {
  tagName: string;
  lang: 'en' | 'ar';
  type: "divine"|"diamond" |"treasure"|"eternal"|"bouquet"|"red-love"|"arr-square"|"arr-round"|"arr-rectangle"|"arr-dome"|"arr-box"|"arr-tub"|"leather"|"vase";
}

export default function ProductList({ tagName, lang, type }: ProductListProps) {
  const t = useTranslations('product');
  const rtlAwareStyle = useRTLAwareStyle('space-x-4 rtl:space-x-reverse', 'space-x-4');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', tagName, lang],
    queryFn: async () => getProductsByTag(tagName, lang),
  });

  const sortedProducts = useMemo(() => {
    if (data && data.items) {
      return [...data.items].sort((a, b) => a.price - b.price);
    }
    return [];
  }, [data]);

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('error')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 w-full">
        <div className="relative py-4">
          <div className="relative flex justify-center border rounded-2xl border-gray-400 p-2">
            <div className="absolute inset-0 flex items-center lg:px-12 xl:px-16">
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <span className="relative z-10 text-center bg-white px-4 text-3xl font-fancy text-gray-900 tracking-widest">
              {t(`heading.${type}`)}
            </span>
          </div>
        </div>
      </div>
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {sortedProducts.map((product: SimpleProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>{t('noProducts')}</div>
      )}
    </div>
  );
}