import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'

import HeroImage from '../../../public/images/bouquetscategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('bouquetsTitle'),
    description: t('bouquetsDescription'),
  }
}

const BouquetsPage = async ({ params: { lang } }: Props) => {
  
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="bouquets"
        imageSrc={HeroImage}
      />
  
      <ProductList type="bouquet" lang={lang as 'en' || 'ar'} tagName='bouquet' />
      <ProductList type="red-love" lang={lang as 'en' || 'ar'} tagName='red bouquet ' />
    </main>
  )
}

export default BouquetsPage