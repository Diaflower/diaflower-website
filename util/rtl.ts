// utils/rtl.ts
import { useTranslations } from 'next-intl'

export function useRTLAwareStyle(ltrStyle: string, rtlStyle: string) {
  const t = useTranslations('common');
  const isRTL = t('lang.name') === 'العربية';
  return isRTL ? rtlStyle : ltrStyle;
}