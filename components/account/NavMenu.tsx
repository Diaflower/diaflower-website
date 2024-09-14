'use client'
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from "@/util/rtl"

type NavItem = {
  name: string;
  path: string;
}

export default function NavMenu({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('account')
 
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`md:hidden border rounded-md mb-4`}
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-between items-center p-4">
          {t('myAccount')}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <Button 
                variant="link" 
                className={`w-full justify-start ${
                  pathname.includes(item.path)? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        <Button type="button" variant="secondary" className="w-full mt-4">
          <SignOutButton redirectUrl="/">{t('signOut')}</SignOutButton>
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}