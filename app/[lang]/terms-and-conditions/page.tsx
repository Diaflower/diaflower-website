import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TermsAndConditions from '@/components/shared/TermsAndConditions'

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
    <TermsAndConditions/>
    </main>
  )
}

export default BouquetsPage