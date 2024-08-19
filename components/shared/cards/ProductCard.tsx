import { Button } from "@/components/ui/button"
import Belle from '../../../public/LaBelle-min.jpg'
import Image from "next/image"

export default function ProductCard() {
  return (
    <div className="w-full border-l border-r border-b border-transparent hover:border-gray-300 px-3 group transition-colors duration-300 ease-in-out">
      <Image
        src={Belle}
        alt="Product Image"
        priority
        className="w-full h-[230px] md:h-[300px] object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-l font-bold">Premium Leather Wallet</h3>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xl font-bold">AED 49.99</span>
          <Button className="w-full rounded-md bg-black text-white md:bg-transparent md:text-transparent md:group-hover:bg-black md:group-hover:text-white transition-colors duration-300 ease-in-out">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}