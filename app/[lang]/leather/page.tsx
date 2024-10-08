import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import leatherBanner from '@/public/images/leathercategory.jpg'

import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('leatherBagsTitle'),
    description: t('leatherBagsDescription'),
  }
}

const LeatherPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="leatherBags"
        imageSrc={leatherBanner}
      />
    <ProductList type="leather" lang={lang as 'en' || 'ar'} tagName='leather bag' />

    </main>
  )
}

export default LeatherPage