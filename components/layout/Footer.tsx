import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Facebook, Twitter, Instagram, } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "News"]
    },
    {
      title: "Products",
      links: ["Men", "Women", "Kids", "Accessories"]
    },
    {
      title: "Resources",
      links: ["Blog", "Community", "Support", "FAQs"]
    }
  ]

  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Facebook, href: "#" }
  ]

  return (
    <footer className="w-full bg-muted py-12 text-muted-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:place-items-center">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold hidden sm:block">{section.title}</h3>
              <div className="hidden sm:grid gap-1">
                {section.links.map((link, linkIndex) => (
                  <Link key={linkIndex} href="#" className="text-sm hover:underline" prefetch={false}>
                    {link}
                  </Link>
                ))}
              </div>
              <Collapsible className="sm:hidden">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold" aria-label={`Toggle ${section.title} section`}>
                  {section.title}
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-1 mt-2">
                    {section.links.map((link, linkIndex) => (
                      <Link key={linkIndex} href="#" className="text-sm hover:underline" prefetch={false}>
                        {link}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <Link key={index} href={href} className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">&copy; 2024 Acme Inc. All rights reserved.</div>
      </div>
    </footer>
  )
}