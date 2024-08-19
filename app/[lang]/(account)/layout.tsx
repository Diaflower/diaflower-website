import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import NavMenu from "@/components/account/NavMenu"
import { AccountHeader } from "@/components/account/AccountHeader"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: "OVERVIEW", path: "/account" },
    { name: "MY PROFILE", path: "/account/profile" },
    { name: "MY PASSWORD", path: "/account/password" },
    { name: "MY ORDERS", path: "/account/orders" },
    // { name: "MY WISH LIST", path: "/account/wishlist" },
    { name: "MY ADDRESSES", path: "/account/addresses" },
    // { name: "MY COLLECTION", path: "/account/collection" },
    // { name: "MY SUBSCRIPTIONS & INTERESTS", path: "/account/subscriptions" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <AccountHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <NavMenu navItems={navItems} />
            
            <Card className="hidden md:block">
              <CardHeader>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">MY ACCOUNT</h2>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path} passHref>
                      <Button variant="link" className="w-full justify-start">
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </nav>
                <form action="/api/logout" method="POST">
                  <Button type="submit" variant="secondary" className="w-full mt-4">LOG OUT</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}