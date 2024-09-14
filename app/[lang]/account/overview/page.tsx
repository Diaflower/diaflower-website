import { Suspense } from 'react'
import OverviewContent from '@/components/account/OverviewContent'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('overviewPageTitle'),
    description: t('overviewPageDescription'),
  };
}

export default async function OverviewPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations('account')

  return (
    <div>
      <h1 className="text-2xl mb-6">{t('accountOverview')}</h1>
      <Suspense fallback={<div>{t('loadingOverview')}</div>}>
        <OverviewContent lang={lang} />
      </Suspense>
    </div>
  )
}