'use client'

import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Logo from "../shared/icons/Logo";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon, Heart, UserRound, ShoppingBag, MapPin } from "lucide-react";

export default function Header() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const icons = [
    { icon: <Heart className="w-5 h-5 text-[#1d1c1c]" />, text: 'Wishlist' },
    { icon: <UserRound className="w-5 h-5 text-[#1d1c1c]" />, text: 'Account' },
    { icon: <MapPin className="w-5 h-5 text-[#1d1c1c]" />, text: 'Location' },
    { icon: <ShoppingBag className="w-5 h-5 text-[#1d1c1c]" />, text: 'View Cart', badge: true }
  ];

 
  const switchLocale = (newLocale:string) => {
    // Only proceed if the new locale is different from the current one
    if (newLocale !== locale) {
      // Remove the current locale from the pathname
      const newPathname = pathname.replace(`/${locale}`, '') || '/';
      router.push(`/${newLocale}${newPathname}`);
    }
  };

  ///// u can just pass the local from layout component


  return (
    <header className="border-b w-full">
      <div className="flex flex-col justify-center gap-8 w-full md:container my-6">
        {/* Top Header Nav */}
        <div className="flex px-2 justify-between items-center md:grid md:grid-cols-3 md:place-items-center w-full">
          {/* Left Nav */}
          <div className="flex w-full">
            <Sheet>
              <SheetTrigger className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                {/* Mobile menu content */}
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex space-x-4">
              
            <div className="hidden md:flex space-x-4">
   
            <div className= {`flex space-x-2 ${locale === 'ar'? "flex-row-reverse ml-3":"mr-3"}`}>
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
              <a href="#">CONTACT US</a>
              <a href="#">SERVICES</a>
            </div>
              
            </div>
          </div>

          {/* Logo */}
          <Logo />

          {/* Right Nav */}
          <div className="flex justify-end space-x-4 w-full">
            {icons.map((item, index) => (
              <div
                key={item.text}
                className={`relative ${index < icons.length - 1 ? 'hidden md:block' : ''}`}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    1
                  </span>
                )}
                {hoveredIcon === index && (
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap">
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      {/* Bottom Header Nav */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex justify-center space-x-6">
            {['TIMELESS COLLECTION', 'BLOOMS', 'BUNDLES', 'SHOP'].map((item) => (
              <li key={item}>
                <a href="#" className="relative group pb-2">
                  <span className="relative z-10 transition-all duration-300 ease-in-out group-hover:font-bold">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-700 ease-in-out group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}