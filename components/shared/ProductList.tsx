'use client'
import { getProductsByTag } from '@/data/products';
import { SimpleProduct } from '@/types/product';
import ProductCard from './cards/ProductCard';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from '@/util/rtl';

import { useQuery } from '@tanstack/react-query';
import {  useMemo } from 'react';

interface ProductListProps {
  tagName: string;
  lang: 'en' | 'ar';
}

export default function ProductList({ tagName, lang }: ProductListProps) {
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
      <h2 className="mb-6 text-2xl font-bold text-center">{t('productsTaggedWith', { tag: tagName })}</h2>
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