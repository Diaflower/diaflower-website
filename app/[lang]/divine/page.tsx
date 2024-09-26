import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'

import HeroImage from '@/public/images/divinecategory.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('timelessCrystalTitle'),
    description: t('timelessCrystalDescription'),
  }
}

const DivinePage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="timelessCrystal"
        imageSrc={HeroImage}
      />
    <ProductList type="divine" lang={lang as 'en' || 'ar'} tagName='crystal' />
    </main>
  )
}

export default DivinePage