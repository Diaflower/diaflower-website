import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import HeroImage from '@/public/images/Banner-main-min.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('timelessDiamondTitle'),
    description: t('timelessDiamondDescription'),
  }
}

const DiamondPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="timelessDiamond"
        imageSrc={HeroImage}
      />
      <ProductList type="diamond" lang={lang as 'en' || 'ar'} tagName='crystal new' />
    </main>
  )
}

export default DiamondPage