import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import HeroImage from '@/public/images/premiumcategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('premiumArrangementsTitle'),
    description: t('premiumArrangementsDescription'),
  }
}

const WoodPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="premiumArrangements"
        imageSrc={HeroImage}
      />

     <ProductList type="arr-box" lang={lang as 'en' || 'ar'} tagName='premium arrangement' />
     <ProductList type="arr-tub" lang={lang as 'en' || 'ar'} tagName='premium arrangement acrylic' />
    </main>
  )
}

export default WoodPage