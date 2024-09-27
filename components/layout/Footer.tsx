
import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Facebook, Twitter, Instagram, MapPin } from "lucide-react"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { useRTLAwareStyle } from "@/util/rtl";

type FooterLink = {
  text: string;
  href: string;
}

type BranchLink = FooterLink & {
  location: string;
}

type FooterSection = {
  title: string;
  links: FooterLink[] | BranchLink[];
}

export default function Footer() {
  const t = useTranslations('common');
  const rtlAwareStyle = useRTLAwareStyle('space-x-4', 'space-x-reverse space-x-4');
  const letterSpacing = useRTLAwareStyle('tracking-widest','')

  const footerSections: FooterSection[] = [
    {
      title: t('footer.sections.company.title'),
      links: [
        { text: t('footer.sections.company.links.cityWalk'), href: 'https://maps.app.goo.gl/BF5CqVd5srDjJM9A8', location: 'Dia Flower, City Walk - Dubai' },
        { text: t('footer.sections.company.links.dubaiMall'), href: 'https://maps.app.goo.gl/uR8sMjToSwmwjzUZ7', location: 'Dia Flower, LG Floor Dubai Mall - Downtown Dubai - Dubai' },
        { text: t('footer.sections.company.links.yasMall'), href: 'https://maps.app.goo.gl/FeCWoQFtPDaJdF1C7', location: 'Dia Flower, Yas Mall - Abu Dhabi' },
        { text: t('footer.sections.company.links.mallOfEmirates'), href: 'https://maps.app.goo.gl/Cuf43tXjwrB1mjmq5', location: 'Dia Flower, Mall of the Emirates - Dubai' },
        { text: t('footer.sections.company.links.soukMadinat'), href: 'https://maps.app.goo.gl/bwQYkLQryqK2MRx97', location: 'Dia Flower, Souk Madinat Jumeirah - Dubai' },
        { text: t('footer.sections.company.links.sharjah'), href: 'https://maps.app.goo.gl/TFRyjCrtyoAbBGRV8', location: 'Dia Flower, Sharjah' },
      ] as BranchLink[]
    },
    {
      title: t('footer.sections.products.title'),
      links: [
        { text: t('footer.sections.products.links.divine'), href: '/divine' },
        { text: t('footer.sections.products.links.bouquets'), href: '/bouquets' },
        { text: t('footer.sections.products.links.treasure'), href: '/treasure' },
        { text: t('footer.sections.products.links.leather'), href: '/leather' },
      ]
    },
    {
      title: t('footer.sections.resources.title'),
      links: [
        { text: t('footer.sections.resources.links.faq'), href: '/faq' },
        { text: t('footer.sections.resources.links.termsConditions'), href: '/terms-conditions' },
        { text: t('footer.sections.resources.links.privacyPolicy'), href: '/privacy-policy' },
        { text: t('footer.sections.resources.links.refundsReturns'), href: '/refunds-returns' },
      ]
    }
  ];

  const socialIcons = [
    { Icon: Facebook, href: "https://facebook.com/diaflower", name: t('footer.socialMedia.facebook') },
    { Icon: Twitter, href: "https://twitter.com/diaflower", name: t('footer.socialMedia.twitter') },
    { Icon: Instagram, href: "https://instagram.com/diaflower", name: t('footer.socialMedia.instagram') }
  ];

  return (
    <footer className="w-full bg-[#222222] py-12 text-gray-200">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:place-items-center">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className={`text-lg font-semibold text-white hidden sm:block ${letterSpacing}`}>{section.title}</h3>
              <div className="hidden sm:grid gap-1">
                {section.links.map((link, linkIndex) => (
                  <Link 
                  key={linkIndex} 
                  href={link.href} 
                  className="text-gray-300 hover:text-white hover:underline font-roboto flex items-center" 
                  prefetch={false}
                  target={index === 0 ? "_blank" : undefined}
                  rel={index === 0 ? "noopener noreferrer" : undefined}
                  aria-label={index === 0 ? `${link.text} - ${(link as BranchLink).location} (opens in Google Maps)` : undefined}
                  >
                    {index === 0 && <MapPin className="h-4 w-4 mr-2" />}
                    {link.text}
                  </Link>
                ))}
              </div>
              <Collapsible className="sm:hidden">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-semibold text-white" aria-label={`Toggle ${section.title} section`}>
                  {section.title}
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-1 mt-2">
                    {section.links.map((link, linkIndex) => (
                      <Link 
                      key={linkIndex} 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:underline font-roboto flex items-center" 
                      prefetch={false}
                      target={index === 0 ? "_blank" : undefined}
                      rel={index === 0 ? "noopener noreferrer" : undefined}
                      aria-label={index === 0 ? `${link.text} - ${(link as BranchLink).location} (opens in Google Maps)` : undefined}
                    >
                        {index === 0 && <MapPin className="h-4 w-4 mr-2" />}
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          <div className="flex flex-col space-y-4 items-center justify-center">
            <h3 className={`text-lg font-semibold text-white ${letterSpacing}`}>{t('footer.followUs')}</h3>
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