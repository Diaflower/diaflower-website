import React from 'react';
import Link from 'next/link';

interface MegaMenuProps {
  item: { name: string; href: string };
}

const MegaMenu: React.FC<MegaMenuProps> = ({ item }) => {
  return (
    <div className="absolute left-0 w-full bg-white shadow-lg z-50 border-t border-[#e5e7eb] transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold mb-4">{item.name}</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium mb-2">Category 1</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 1</Link></li>
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 2</Link></li>
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 3</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Category 2</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 1</Link></li>
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 2</Link></li>
              <li><Link href="#" className="hover:underline transition-all duration-200 ease-in-out">Subcategory 3</Link></li>
            </ul>
          </div>
          {/* Add more categories as needed */}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;