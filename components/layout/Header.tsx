'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Logo from "../shared/icons/Logo";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UserRound, ShoppingBag, Search, Menu } from "lucide-react";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import CartSheet from "../shared/CartSheet";
import { Button } from "@/components/ui/button";
import { LanguageSwitcherProps,IconWithTooltipProps,NavItemProps,MobileMenuProps } from "@/types/header";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const icons = [
    { icon: <Search className="w-5 h-5 text-[#1d1c1c]" />, text: 'Search' },
    { icon: <UserRound className="w-5 h-5 text-[#1d1c1c]" />, text: 'Account' },
    { icon: <ShoppingBag className="w-5 h-5 text-[#1d1c1c]" />, text: 'View Cart', badge: true }
  ];

  const navItems = [
    { name: 'TIMELESS COLLECTION', href: '/timeless-collection' },
    { name: 'BOUQUETS', href: '/bouquets' },
    { name: 'BOXES', href: '/boxes' },
    { name: 'LEATHER', href: '/leather' },
    { name: 'VASES', href: '/vases' }
  ];

  const switchLocale = (newLocale:string) => {
    if (newLocale !== locale) {
      const newPathname = pathname.replace(`/${locale}`, '') || '/';
      router.push(`/${newLocale}${newPathname}`);
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
            <Link href="/contact" className="hover:underline">CONTACT US</Link>
            {/* <Link href="/services" className="hover:underline">SERVICES</Link> */}
          </div>

          <div className="md:justify-self-center">
          <Link href={'/'}>
            <Logo />
            <VisuallyHidden.Root>Home</VisuallyHidden.Root>
          </Link>
        </div>

          {/* Right Nav */}
          <div className="flex justify-end gap-3 w-full">
          {icons.map((item, index) => (
              <IconWithTooltip key={item.text} item={item} index={index} hoveredIcon={hoveredIcon} setHoveredIcon={setHoveredIcon} />
            ))}
            {/* Mobile menu icon */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="w-5 h-5 text-[#1d1c1c]" />
              </SheetTrigger>
              <SheetContent>
                <VisuallyHidden.Root>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through the site options.</SheetDescription>
                </VisuallyHidden.Root>
                <MobileMenu navItems={navItems} locale={locale} switchLocale={switchLocale} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

           {/* Bottom Header Nav */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex justify-center space-x-6">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )

  // return (
  //   <header className="border-b w-full">
  //     <div className="flex flex-col justify-center gap-4 md:gap-8 w-full md:container my-4 md:my-6">
  //       {/* Top Header Nav */}
  //       <div className="flex px-2 justify-between items-center md:grid md:grid-cols-3 md:place-items-center w-full">
  //         {/* Left Nav (hidden on mobile) */}
  //         <div className="hidden md:flex md:w-full space-x-4">
  //           <LanguageSwitcher locale={locale} switchLocale={switchLocale} />
  //           <Link href="/contact" className="hover:underline">CONTACT US</Link>
  //           {/* <Link href="/services" className="hover:underline">SERVICES</Link> */}
  //         </div>

  //         <div className="md:justify-self-center">
  //         <Link href={'/'}>
  //           <Logo />
  //           <VisuallyHidden.Root>Home</VisuallyHidden.Root>
  //         </Link>
  //       </div>

  //         {/* Right Nav */}
  //         <div className="flex justify-end gap-3 w-full">
  //         {icons.map((item, index) => (
  //             <IconWithTooltip key={item.text} item={item} index={index} hoveredIcon={hoveredIcon} setHoveredIcon={setHoveredIcon} />
  //           ))}
  //           {/* Mobile menu icon */}
  //           <Sheet>
  //             <SheetTrigger className="md:hidden">
  //               <Menu className="w-5 h-5 text-[#1d1c1c]" />
  //             </SheetTrigger>
  //             <SheetContent>
  //               <VisuallyHidden.Root>
  //                 <SheetTitle>Menu</SheetTitle>
  //                 <SheetDescription>Navigate through the site options.</SheetDescription>
  //               </VisuallyHidden.Root>
  //               <MobileMenu navItems={navItems} locale={locale} switchLocale={switchLocale} />
  //             </SheetContent>
  //           </Sheet>
  //         </div>
  //       </div>

  //       {/* Bottom Header Nav */}
  //       <nav className="hidden md:flex justify-center">
  //         <ul className="flex justify-center space-x-6">
  //           {navItems.map((item) => (
  //             <NavItem key={item.name} item={item} />
  //           ))}
  //         </ul>
  //       </nav>
  //     </div>
  //   </header>
  // )
}


function LanguageSwitcher({ locale, switchLocale }:LanguageSwitcherProps ) {
  return (
    <div className={`flex space-x-2 ${locale === 'ar' ? "flex-row-reverse ml-3" : ""}`}>
      <button 
        onClick={() => switchLocale('en')}
        className={`${locale === 'en' ? 'underline cursor-default' : 'opacity-70 hover:underline'}`}
        disabled={locale === 'en'}
      >
        EN
      </button>
      <span>/</span>
      <button 
        onClick={() => switchLocale('ar')}
        className={`${locale === 'ar' ? 'underline cursor-default' : 'opacity-70 hover:underline'}`}
        disabled={locale === 'ar'}
      >
        العربية
      </button>
    </div>
  );
}


function IconWithTooltip({ item, index, hoveredIcon, setHoveredIcon }: IconWithTooltipProps) {
  if (item.text === 'View Cart') {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative p-0"
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {item.icon}
            <span className="sr-only">View Cart</span>
            {item.badge && (
              <span className="absolute top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            )}
            {hoveredIcon === index && (
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap">
                {item.text}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <CartSheet />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Button
      variant="ghost"
      className="relative p-0"
      onMouseEnter={() => setHoveredIcon(index)}
      onMouseLeave={() => setHoveredIcon(null)}
    >
      {item.icon}
      <span className="sr-only">{item.text}</span>
      {hoveredIcon === index && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap">
          {item.text}
        </span>
      )}
    </Button>
  );
}



// function NavItem({ item }: NavItemProps) {
//   return (
//     <li>
//       <Link href={item.href} className="relative group pb-2">
//         <span className="relative z-10 transition-all duration-300 ease-in-out group-hover:font-bold">
//           {item.name}
//         </span>
//         <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-700 ease-in-out group-hover:w-full"></span>
//       </Link>
//     </li>
//   );
// }

function NavItem({ item }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={item.href} className="group inline-block">
          <span className="relative z-10 transition-all duration-300 ease-in-out group-hover:font-bold">
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </span>
        </Link>
      </div>
      {isHovered && (
        <div className="absolute left-0 w-full" style={{ top: '100%' }}>
          <MegaMenu item={item} />
        </div>
      )}
    </li>
  );
}
function MobileMenu({ navItems, locale, switchLocale }: MobileMenuProps) {
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
          <li><Link href="/contact" className="block py-2 hover:bg-gray-100">CONTACT US</Link></li>
          {/* <li><Link href="/services" className="block py-2 hover:bg-gray-100">SERVICES</Link></li> */}
        </ul>
      </nav>
    </div>
  );
}