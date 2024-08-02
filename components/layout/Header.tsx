import Logo from "../shared/icons/Logo";

export default function Component() {
  return (
    <div className="w-full border-b flex flex-col pt-4 pb-2 gap-6">
      {/* /// TOP HEADER NAV */}
      <div className="grid grid-cols-3 place-items-center py-2 w-full">
        {/* /// LEFT NAV */}
        <div className="flex items-center space-x-4">
          {/* test  */}
          <a href="#" className="text-sm font-medium">
            EN / العربية
          </a>
          <a href="#" className="text-sm font-medium">
            CONTACT US
          </a>
          <a href="#" className="text-sm font-medium">
            SERVICES
          </a>
        </div>

        {/* /// LOGO */}
        <div className="text-4xl font-serif flex justify-center">
          <Logo />
        </div>

        {/* /// RIGHT NAV  */}
        <div className="flex items-center space-x-4 justify-end">
          <HeartIcon className="w-5 h-5 text-[#1d1c1c]" />
          <UserIcon className="w-5 h-5 text-[#1d1c1c]" />
          <MapPinIcon className="w-5 h-5 text-[#1d1c1c]" />
          <div className="relative">
            <ShoppingBagIcon className="w-5 h-5 text-[#1d1c1c]" />
            <span className="absolute top-0 right-0 text-xs text-pink-600">
              1
            </span>
          </div>
        </div>
      </div>

      {/* /// BOTTOM HEADER NAV */}
      <div className="flex items-center justify-center py-2 space-x-4">
        <a href="#" className="text-sm font-medium">
          TIMELESS COLLECTION
        </a>
        <a href="#" className="text-sm font-medium">
          BLOOMS
        </a>
        <a href="#" className="text-sm font-medium">
          BUNDLES
        </a>
        <a href="#" className="text-sm font-medium">
          SHOP
        </a>
        <SearchIcon className="w-6 h-6" />
      </div>
    </div>
  );
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
