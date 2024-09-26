import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import HeroImage from '@/public/images/treasurecategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('timelessWoodTitle'),
    description: t('timelessWoodDescription'),
  }
}

const WoodPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="timelessWood"
        imageSrc={HeroImage}
      />

  <ProductList type="treasure" lang={lang as 'en' || 'ar'} tagName='wood' />

    </main>
  )
}

export default WoodPage