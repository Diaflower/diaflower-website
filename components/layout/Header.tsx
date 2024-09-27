'use client'
import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import Logo from "../shared/icons/Logo"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet"
import { UserRound, ShoppingBag, Menu, ChevronDown } from "lucide-react"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { IconWithTooltip } from "../shared/IconWithTooltip"
import { useRTLAwareStyle } from "@/util/rtl"
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import divineImage from '@/public/images/divine.jpg'
import diamondImage from '@/public/images/diamond.jpg'
import woodImage from '@/public/images/wood.jpg'
import eternalImage from '@/public/images/eternal.jpg'
import squareImage from '@/public/images/square.jpg'
import domeImage from '@/public/images/dome.jpg'
import recImage from '@/public/images/rectangle.jpg'
import premiumImage from '@/public/images/premium.jpg'
import { useInView } from "@/hooks/useInView"

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const { isSignedIn } = useAuth()
  const t = useTranslations('common')
  const rtlAwareStyle = useRTLAwareStyle('left-2', 'right-2')
  const { ref, isInView } = useInView()
  const icons = [
    { icon: <UserRound className="w-5 h-5 text-[#1d1c1c]" />, text: t('header.account') },
    { icon: <ShoppingBag className="w-5 h-5 text-[#1d1c1c]" />, text: t('header.viewCart'), badge: true }
  ]

  const navItems = [
    { name: t('nav.timelessCollection'), href: '#', megaMenu: true, sections: 3 },
    { name: t('nav.bouquets'), href: '/bouquets' },
    { name: t('nav.boxes'), href: '#', megaMenu: true, sections: 2 },
    { name: t('nav.leather'), href: '/leather' },
    { name: t('nav.vases'), href: '/vases' }
  ]

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPathname = pathname.replace(`/${locale}`, '') || '/'
      router.push(`/${newLocale}${newPathname}`)
    }
  }

  const handleAccountClick = () => {
    if (isSignedIn) {
      router.push('/account/overview')
    } else {
      router.push('/sign-in')
    }
  }

  const handleMouseEnter = (itemName: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setHoveredItem(itemName)
    setIsMenuVisible(true)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
      setIsMenuVisible(false)
    }, 300)
  }

  const handleMegaMenuLinkClick = () => {
    setHoveredItem(null)
    setIsMenuVisible(false)
  }

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="border-b w-full relative bg-white"
    >
      <div className="flex flex-col justify-center gap-5 w-full md:container my-4 md:mt-8 md:mb-2">
        {/* Top Header Nav */}
        <div className="flex px-2 items-center w-full">
          {/* Left Nav (mobile menu on small screens, language switcher and contact us on larger screens) */}
          <div className="flex-1 flex md:w-full space-x-4 md:self-start">
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="w-5 h-5 text-[#1d1c1c]" />
              </SheetTrigger>
             
              <VisuallyHidden.Root>
                <SheetTitle>{t('header.menu')}</SheetTitle>
                <SheetDescription>{t('header.menuDescription')}</SheetDescription>
              </VisuallyHidden.Root>
              
              <SheetContent side={locale === 'ar' ? 'right' : 'left'}>
                <MobileMenu navItems={navItems} locale={locale} switchLocale={switchLocale} />
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex space-x-4">
              <LanguageSwitcher locale={locale} switchLocale={switchLocale} />
              <Link href="/contact" className="hover:underline">{t('header.contactUs')}</Link>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
            <Link href={'/'}>
              <Logo />
              <VisuallyHidden.Root>{t('header.home')}</VisuallyHidden.Root>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex-1 flex justify-end gap-5 md:self-start">
            {icons.map((item, index) => (
              <IconWithTooltip 
                key={item.text} 
                item={item} 
                index={index}
                handleAccountClick={handleAccountClick}
              />
            ))}
          </div>
        </div>

        {/* Bottom Header Nav */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex justify-center gap-7">
            {navItems.map((item) => (
              <li 
                key={item.name}
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
                className=""
              >
                <NavLink href={item.href} isHovered={hoveredItem === item.name} hasMegaMenu={item.megaMenu}>
                  {item.name}
                </NavLink>
                <AnimatePresence>
                  {item.megaMenu && hoveredItem === item.name && (
                    <MegaMenu 
                      item={item} 
                      isVisible={isMenuVisible} 
                      onLinkClick={handleMegaMenuLinkClick}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

function NavLink({ href, children, isHovered, hasMegaMenu }: { href: string, children: React.ReactNode, isHovered: boolean, hasMegaMenu: boolean |undefined }) {
  const rtlAwareStyle = useRTLAwareStyle('left-0', 'right-0')
  const letterSpacing = useRTLAwareStyle('tracking-widest', '')

  return (
    <Link href={href} className="group inline-flex items-center cursor-pointer">
      <span className={`relative z-10 transition-all duration-300 ease-in-out font-semibold ${letterSpacing}`}>
        {children}
        <span className={`absolute bottom-0 ${rtlAwareStyle} w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out ${isHovered ? 'w-full' : ''}`}></span>
      </span>
    </Link>
  )
}

function LanguageSwitcher({ locale, switchLocale }: { locale: string, switchLocale: (newLocale: string) => void }) {
  const t = useTranslations('common')
  return (
    <div className={`flex space-x-2 ${locale === 'ar' ? "flex-row-reverse ml-3" : ""}`}>
      <button 
        onClick={() => switchLocale('en')}
        className={`${locale === 'en' ? 'underline cursor-default' : 'opacity-70 hover:underline'}`}
        disabled={locale === 'en'}
      >
        {t('lang.en')}
      </button>
      <span>/</span>
      <button 
        onClick={() => switchLocale('ar')}
        className={`${locale === 'ar' ? 'underline cursor-default' : 'opacity-70 hover:underline'}`}
        disabled={locale === 'ar'}
      >
        {t('lang.ar')}
      </button>
    </div>
  )
}

function MegaMenu({ item, isVisible, onLinkClick }: { 
  item: { name: string; href: string; sections: number }, 
  isVisible: boolean,
  onLinkClick: () => void
}) {
  const t = useTranslations('common')
  const letterSpacing = useRTLAwareStyle('tracking-widest','')
  const icon = useRTLAwareStyle('','rotate-180')
  const translate = useRTLAwareStyle('group-hover:translate-x-1','')
  const gridColumns = 'md:grid-cols-4'

  const menuItems = {
    [t('nav.timelessCollection')]: [
      { title: t('nav.timelessDivine'), description: t('nav.timelessDivineDesc'), href: '/divine', image: divineImage},
      { title: t('nav.timelessWood'), description: t('nav.timelessWoodDesc'), href: '/treasure', image:  woodImage },
      { title: t('nav.timelessAcrylic'), description: t('nav.timelessAcrylicDesc'), href: '/eternal', image:  eternalImage },
      { title: t('nav.timelessDiamond'), description: t('nav.timelessDiamondDesc'), href: '/diamond', image:  diamondImage }
    ],
    [t('nav.boxes')]: [
      { title: t('nav.squareBoxArrangements'), description: t('nav.squareBoxArrangementsDesc'), href: '/box-arrangement', image:  squareImage },
      { title: t('nav.domeBoxArrangements'), description: t('nav.domeBoxArrangementsDesc'), href: '/box-arrangement', image:  domeImage },
      { title: t('nav.rectangleBoxArrangements'), description: t('nav.rectangleBoxArrangementsDesc'), href: '/box-arrangement', image:  recImage },
      { title: t('nav.premiumArrangements'), description: t('nav.premiumArrangementsDesc'), href: '/premium-box', image:  premiumImage }
    ]
  }

  const currentItems = menuItems[item.name as keyof typeof menuItems] || []

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`absolute left-0 w-full bg-white shadow-lg z-50 border-t overflow-hidden`}
      style={{ top: '100%' }}
    >
      <div className="container mx-auto px-4 py-8">
        <ul className={`grid gap-8 ${gridColumns}`}>
          {currentItems.map((menuItem, index) => (
            <li key={index} className="col-span-1">
              <Link href={menuItem.href} className="group block h-full" onClick={onLinkClick}>
                <div className="flex flex-col h-full border rounded-lg overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={menuItem.image}
                      alt={t(`nav.${menuItem.title.toLowerCase()}ImageAlt`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`text-xl font-semibold group-hover:text-primary transition-colors duration-200 mb-2 ${letterSpacing}`}>
                      {menuItem.title}
                    </h3>
                    <p className="text-sm text-darGreyy leading-relaxed flex-grow font-roboto">
                      {menuItem.description}
                    </p>
                    <span className={`inline-flex items-center text-sm font-medium text-darGreyy mt-4 ${letterSpacing}`}>
                      {t('nav.learnMore')}
                      <svg className={`w-4 h-4 ml-2 ${translate} transition-transform duration-200 ${icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function MobileMenu({ navItems, locale, switchLocale }: { navItems: Array<{ name: string; href: string; megaMenu?: boolean }>, locale: string, switchLocale: (newLocale: string) => void }) {
  const t = useTranslations('common')
  return (
    <div className="py-4">
      <LanguageSwitcher locale={locale} switchLocale={switchLocale} />
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <span className="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
                {item.name}
                {item.megaMenu && <ChevronDown className="ml-1 w-4 h-4" />}
              </span>
            </li>
          ))}
          <li><Link href="/contact" className="block py-2 hover:bg-gray-100">{t('header.contactUs')}</Link></li>
        </ul>
      </nav>
    </div>
  )
}