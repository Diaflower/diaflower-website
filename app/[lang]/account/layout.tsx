import { getTranslations } from 'next-intl/server';
import NavMenu from "@/components/account/NavMenu"
import { AccountHeader } from "@/components/account/AccountHeader"
import NavMenuBig from "@/components/account/NavMenuBig"

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: t('accountTitle'),
    description: t('accountDescription'),
  };
}

export default async function AccountLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const t = await getTranslations('account');

  const navItems = [
    { name: t('overview'), path: "/account/overview" },
    { name: t('myProfile'), path: "/account/profile" },
    { name: t('myOrders'), path: "/account/orders" },
    { name: t('myAddresses'), path: "/account/addresses" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <AccountHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <NavMenu navItems={navItems} />
            <NavMenuBig navItems={navItems}/>
          </div>

          <div className="md:col-span-3 space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}