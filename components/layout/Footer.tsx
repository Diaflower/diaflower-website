import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Facebook, Twitter, Instagram } from "lucide-react"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from "@/util/rtl";

export default function Footer() {
  const t = useTranslations('common');
  const rtlAwareStyle = useRTLAwareStyle('space-x-4', 'space-x-reverse space-x-4');

  const footerSections = [
    {
      title: t('footer.sections.company.title'),
      links: ['about', 'team', 'careers', 'news'].map(key => t(`footer.sections.company.links.${key}`))
    },
    {
      title: t('footer.sections.products.title'),
      links: ['men', 'women', 'kids', 'accessories'].map(key => t(`footer.sections.products.links.${key}`))
    },
    {
      title: t('footer.sections.resources.title'),
      links: ['blog', 'community', 'support', 'faqs'].map(key => t(`footer.sections.resources.links.${key}`))
    }
  ];

  const socialIcons = [
    { Icon: Facebook, href: "#", name: t('footer.socialMedia.facebook') },
    { Icon: Twitter, href: "#", name: t('footer.socialMedia.twitter') },
    { Icon: Instagram, href: "#", name: t('footer.socialMedia.instagram') }
  ];

  return (
    <footer className="w-full bg-gray-800 py-12 text-gray-200">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:place-items-center">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-white hidden sm:block">{section.title}</h3>
              <div className="hidden sm:grid gap-1">
                {section.links.map((link: string, linkIndex: number) => (
                  <Link key={linkIndex} href="#" className="text-gray-300 hover:text-white hover:underline" prefetch={false}>
                    {link}
                  </Link>
                ))}
              </div>
              <Collapsible className="sm:hidden">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold text-white" aria-label={`Toggle ${section.title} section`}>
                  {section.title}
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-1 mt-2">
                    {section.links.map((link: string, linkIndex: number) => (
                      <Link key={linkIndex} href="#" className="text-gray-300 hover:text-white hover:underline" prefetch={false}>
                        {link}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{t('footer.followUs')}</h3>
            <div className={`flex ${rtlAwareStyle}`}>
              {socialIcons.map(({ Icon, href, name }, index) => (
                <Link 
                  key={index} 
                  href={href} 
                  className="text-gray-300 hover:text-white" 
                  prefetch={false}
                  aria-label={`${name} (opens in a new tab)`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Icon className="h-6 w-6" />
                  <VisuallyHidden.Root>{name}</VisuallyHidden.Root>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-400">{t('footer.copyright')}</div>
      </div>
    </footer>
  )
}