import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import HeroImage from '../../../public/images/arrangementcategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('boxArrangementsTitle'),
    description: t('boxArrangementsDescription'),
  }
}

const BoxArrangementPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="boxArrangements"
        imageSrc={HeroImage}
      />
      <ProductList type="arr-square" lang={lang as 'en' || 'ar'} tagName='arrangement-box' />
      <ProductList type="arr-round" lang={lang as 'en' || 'ar'} tagName='arrangement-round' />
      <ProductList type="arr-dome" lang={lang as 'en' || 'ar'} tagName='arrangement-dome' />
      <ProductList type="arr-rectangle" lang={lang as 'en' || 'ar'} tagName='arrangement-rectangle' />


    </main>
  )
}

export default BoxArrangementPage