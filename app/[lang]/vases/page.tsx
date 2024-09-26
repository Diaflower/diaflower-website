import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection'
import vaseBanner from '@/public/Vase.jpg'
import ProductList from '@/components/shared/ProductList'
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' })

  return {
    title: t('vasesTitle'),
    description: t('vasesDescription'),
  }
}

const VasesPage = async ({ params: { lang } }: Props) => {
  return (
    <main className='w-full'>
      <CategoryHeaderSection 
        category="vases"
        imageSrc={vaseBanner}
      />

<ProductList type="vase" lang={lang as 'en' || 'ar'} tagName='vases' />
    </main>
  )
}

export default VasesPage