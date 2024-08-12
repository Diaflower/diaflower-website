import { Dispatch, SetStateAction } from "react";

export type LanguageSwitcherProps = {
    locale: string;
    switchLocale: (newLocale: string) => void;
  }


  type IconItem = {
    icon: JSX.Element;
    text: string;
    badge?: boolean;
  }
  
  
  export type IconWithTooltipProps = {
    item: IconItem;
    index: number;
    hoveredIcon: number | null;
    setHoveredIcon: Dispatch<SetStateAction<number | null>>;
  }


  export type NavItemProps = {
    item: { name: string; href: string };
  }
  

  export type MobileMenuProps = {
    navItems: { name: string; href: string }[];
    locale: string;
    switchLocale: (newLocale: string) => void;
  }