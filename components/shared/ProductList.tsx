'use client'

import { getProductsByTag } from '@/data/products'
import { SimpleProduct } from '@/types/product'
import ProductCard from './cards/ProductCard'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface ProductListProps {
  tagName: string
  lang: 'en' | 'ar'
  type: "divine"|"diamond"|"treasure"|"eternal"|"bouquet"|"red-love"|"arr-square"|"arr-round"|"arr-rectangle"|"arr-dome"|"arr-box"|"arr-tub"|"leather"|"vase"
}

const ProductSkeleton = () => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="h-64 bg-gray-200 animate-pulse"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
)

export default function ProductList({ tagName, lang, type }: ProductListProps) {
  const t = useTranslations('product')
  const rtlAwareStyle = useRTLAwareStyle('space-x-4 rtl:space-x-reverse', 'space-x-4')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', tagName, lang],
    queryFn: async () => getProductsByTag(tagName, lang),
  })

  const sortedProducts = useMemo(() => {
    if (data && data.items) {
      return [...data.items].sort((a, b) => a.price - b.price)
    }
    return []
  }, [data])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

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
      {isError ? (
        <div className="text-center text-red-500">{t('error')}</div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ProductSkeleton />
                </motion.div>
              ))
            : sortedProducts.length > 0
            ? sortedProducts.map((product: SimpleProduct) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            : <div className="col-span-full text-center">{t('noProducts')}</div>
          }
        </motion.div>
      )}
    </div>
  )
}