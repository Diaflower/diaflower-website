'use client'

import { useTranslations } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TermsAndConditions() {
  const t = useTranslations('terms')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="mb-6">{t('introduction')}</p>
      
      <Accordion type="single" collapsible className="w-full">
        {['products', 'pricing', 'orders', 'delivery', 'cancellationAndRefunds', 'customerCare', 'intellectualProperty', 'liability', 'privacy'].map((section) => (
          <AccordionItem key={section} value={section}>
            <AccordionTrigger className='font-roboto'>{t(`sections.${section}.title`)}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {t(`sections.${section}.content`).split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('contact.title')}</h2>
        <p>{t('contact.content')}</p>
        <p className="mt-2">
          {t('contact.email')}: <a href="mailto:support@diaflower.com" className="hover:underline font-roboto">support@diaflower.com</a>
        </p>
        <p>
          {t('contact.phone')}: <a href="tel:+971554227757" className="hover:underline font-roboto">+971 554227757</a>
        </p>
      </div>
    </div>
  )
}