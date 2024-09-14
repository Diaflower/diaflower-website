'use client'

import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import Logo from "../shared/icons/Logo";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UserRound, ShoppingBag, Search, Menu } from "lucide-react";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { LanguageSwitcherProps, NavItemProps, MobileMenuProps } from "@/types/header";
import MegaMenu from "./MegaMenu";
import { IconWithTooltip } from "../shared/IconWithTooltip";
import { useRTLAwareStyle } from "@/util/rtl";

export default function Header() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { isSignedIn } = useAuth();
  const t = useTranslations('common');
  const rtlAwareStyle = useRTLAwareStyle('left-2', 'right-2');

  const icons = [
    { icon: <Search className="w-5 h-5 text-[#1d1c1c]" />, text: t('header.search') },
    { icon: <UserRound className="w-5 h-5 text-[#1d1c1c]" />, text: t('header.account') },
    { icon: <ShoppingBag className="w-5 h-5 text-[#1d1c1c]" />, text: t('header.viewCart'), badge: true }
  ];

  const navItems = [
    { name: t('nav.timelessCollection'), href: '/timeless-collection' },
    { name: t('nav.bouquets'), href: '/bouquets' },
    { name: t('nav.boxes'), href: '/boxes' },
    { name: t('nav.leather'), href: '/leather' },
    { name: t('nav.vases'), href: '/vases' }
  ];

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPathname = pathname.replace(`/${locale}`, '') || '/';
      router.push(`/${newLocale}${newPathname}`);
    }
  };

  const handleAccountClick = () => {
    if (isSignedIn) {
      router.push('/account/overview');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <header className="border-b w-full relative">
      <div className="flex flex-col justify-center gap-4 md:gap-8 w-full md:container my-4 md:my-6">
        {/* Top Header Nav */}
        <div className="flex px-2 justify-between items-center md:grid md:grid-cols-3 md:place-items-center w-full">
          {/* Left Nav (hidden on mobile) */}
          <div className="hidden md:flex md:w-full space-x-4">
            <LanguageSwitcher locale={locale} switchLocale={switchLocale} />
            <Link href="/contact" className="hover:underline">{t('header.contactUs')}</Link>
          </div>

          <div className="md:justify-self-center">
            <Link href={'/'}>
              <Logo />
              <VisuallyHidden.Root>{t('header.home')}</VisuallyHidden.Root>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex justify-end gap-3 w-full">
          {icons.map((item, index) => (
          <IconWithTooltip 
            key={item.text} 
            item={item} 
            index={index}
            handleAccountClick={handleAccountClick}
          />
        ))}
            {/* Mobile menu icon */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="w-5 h-5 text-[#1d1c1c]" />
              </SheetTrigger>
              <SheetContent side={locale === 'ar' ? 'left' : 'right'}>
                <VisuallyHidden.Root>
                  <SheetTitle>{t('header.menu')}</SheetTitle>
                  <SheetDescription>{t('header.menuDescription')}</SheetDescription>
                </VisuallyHidden.Root>
                <MobileMenu navItems={navItems} locale={locale} switchLocale={switchLocale} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Bottom Header Nav */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex justify-center gap-5">
            {navItems.map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isHovered={hoveredNavItem === item.name}
                setIsHovered={(isHovered) => setHoveredNavItem(isHovered ? item.name : null)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function LanguageSwitcher({ locale, switchLocale }: LanguageSwitcherProps) {
  const t = useTranslations('common');
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
  );
}

function NavItem({ item, isHovered, setIsHovered }: NavItemProps & { isHovered: boolean; setIsHovered: (isHovered: boolean) => void }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const rtlAwareStyle = useRTLAwareStyle('left-0', 'right-0');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => setShowMegaMenu(true), 200);
    } else {
      setShowMegaMenu(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={item.href} className="group inline-block">
          <span className="relative z-10 transition-all duration-300 ease-in-out group-hover:font-semibold">
            {item.name}
            <span className={`absolute bottom-0 ${rtlAwareStyle} w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full`}></span>
          </span>
        </Link>
      </div>
      {showMegaMenu && (
        <div 
          className={`absolute ${rtlAwareStyle} w-full transition-opacity duration-300 ease-in-out`} 
          style={{ top: '100%', opacity: showMegaMenu ? 1 : 0 }}
        >
          <MegaMenu item={item} />
        </div>
      )}
    </li>
  );
}

function MobileMenu({ navItems, locale, switchLocale }: MobileMenuProps) {
  const t = useTranslations('common');
  return (
    <div className="py-4">
      <LanguageSwitcher locale={locale} switchLocale={switchLocale} />
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="block py-2 hover:bg-gray-100">{item.name}</Link>
            </li>
          ))}
          <li><Link href="/contact" className="block py-2 hover:bg-gray-100">{t('header.contactUs')}</Link></li>
        </ul>
      </nav>
    </div>
  );
}