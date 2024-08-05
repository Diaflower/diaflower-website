'user client'
import { useState } from "react";
import Logo from "../shared/icons/Logo";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Hwader() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const icons = [
    { icon: <HeartIcon className="w-5 h-5 text-[#1d1c1c]" />, text: 'Wishlist' },
    { icon: <UserIcon className="w-5 h-5 text-[#1d1c1c]" />, text: 'Account' },
    { icon: <MapPinIcon className="w-5 h-5 text-[#1d1c1c]" />, text: 'Location' },
    { icon: <ShoppingBagIcon className="w-5 h-5 text-[#1d1c1c]" />, text: 'View Cart', badge: true }
  ];

  return (
    <header className="border-b flex flex-col">
    {/* Top Header Nav */}
    <div className="px-2 py-4 flex justify-between items-center md:grid md:grid-cols-3 md:place-items-center w-full md:container">
      {/* Left Nav */}
      <div className="flex w-full space-x-4">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left">
            {/* Mobile menu content */}
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex space-x-4">
          <button>EN / العربية</button>
          <a href="#">CONTACT US</a>
          <a href="#">SERVICES</a>
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
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1">
                {item.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Header Nav */}
    <nav className="hidden md:block container mx-auto px-4 py-2">
      <ul className="flex justify-center space-x-6">
        <li><a href="#" className="hover:text-gray-600">TIMELESS COLLECTION</a></li>
        <li><a href="#" className="hover:text-gray-600">BLOOMS</a></li>
        <li><a href="#" className="hover:text-gray-600">BUNDLES</a></li>
        <li><a href="#" className="hover:text-gray-600">SHOP</a></li>
      </ul>
    </nav>
  </header>
  )
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
