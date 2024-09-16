import { getTranslations } from 'next-intl/server'
import ProfileForm from '@/components/forms/ProfileForm'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('profilePageTitle'),
    description: t('profilePageDescription'),
  };
}

export default async function ProfilePage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations('account')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{t('myProfile')}</h1>
      <p className="text-muted-foreground">
        {t('profilePageIntro')}
      </p>
      <ProfileForm lang={lang} />
    </div>
  )
}