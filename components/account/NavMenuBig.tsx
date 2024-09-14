'use client'
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from "next/navigation"
import { useClerk } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

type NavItem = {
  name: string;
  path: string;
}

const NavMenuBig = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const t = useTranslations('account')


  return (
    <Card className={`hidden md:block`}>
      <CardHeader>
        <h2 className="text-2xl leading-none tracking-tight">{t('myAccount')}</h2>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <Button 
                variant="link" 
                className={`w-full justify-start ${
                  pathname.includes(item.path) ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        <Button onClick={() => signOut({ redirectUrl: '/' })} variant={'secondary'} className='mt-4 w-full font-semibold'>
          {t('signOut')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default NavMenuBig