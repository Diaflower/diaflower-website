import { getTranslations } from 'next-intl/server'
import AddressesForm from '@/components/forms/AddressesForm'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('addressesPageTitle'),
    description: t('addressesPageDescription'),
  };
}

export default async function AddressesPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations('account')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('myAddresses')}</h1>
      <p className="text-muted-foreground">
        {t('addressesPageIntro')}
      </p>
      <AddressesForm lang={lang} />
    </div>
  )
}