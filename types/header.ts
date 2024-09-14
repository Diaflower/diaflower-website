import { Dispatch, SetStateAction } from "react";

export type LanguageSwitcherProps = {
  locale: string;
  switchLocale: (newLocale: string) => void;
}

export type IconItem = {
  icon: JSX.Element;
  text: string;
  badge?: boolean;
}

export type IconWithTooltipProps = {
  item: IconItem;
  index: number;
  hoveredIcon: number | null;
  setHoveredIcon: Dispatch<SetStateAction<number | null>>;
  handleAccountClick?: () => void;
}

export type NavItem = {
  name: string;
  href: string;
}

export type NavItemProps = {
  item: NavItem;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
}

export type MobileMenuProps = {
  navItems: NavItem[];
  locale: string;
  switchLocale: (newLocale: string) => void;
}

export type MegaMenuProps = {
  item: NavItem;
}