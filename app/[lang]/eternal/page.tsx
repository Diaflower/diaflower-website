import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import HeroImage from '@/public/images/eternalcategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('timelessAcrylicTitle'),
    description: t('timelessAcrylicDescription'),
  }
}

const AcrylicPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="timelessAcrylic"
        imageSrc={HeroImage}
      />
      <ProductList type="eternal" lang={lang as 'en' || 'ar'} tagName='acrylic' />
      <ProductList type="eternal-grand" lang={lang as 'en' || 'ar'} tagName='acrylic-premium' />
    </main>
  )
}

export default AcrylicPage