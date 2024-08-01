'use client';

import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';

export default function LanguageAwareButton() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <button 
      className={`
        px-4 py-2 rounded 
        ${locale === 'ar' ? 'bg-green-500 text-right' : 'bg-blue-500 text-left'}
      `}
      style={{
        direction: locale === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      {t('buttonText')}
    </button>
  );
}