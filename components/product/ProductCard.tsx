
import { Button } from "@/components/ui/button"
import Belle from '../../public/Lovers.jpg'
import Image from "next/image"
export default function ProductCard() {
  return (
    <div className="bg-background w-full border-l border-r border-b border-white hover:border-gray-300 px-3 group transition-colors duration-300 ease-in-out">
      <Image
        src= {Belle}
        alt="Product Image"
        // width={400}
        // height={500}
        className="w-full h-[330px] object-cover"
        // style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="p-4 space-y-3 text-center">
        <h3 className="text-l font-bold">Premium Leather Wallet</h3>
        {/* <p className="text-muted-foreground">
          Crafted from high-quality leather
        </p> */}
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xl font-bold">AED 49.99</span>
          <Button className="w-full rounded-md bg-white group-hover:bg-black transition-colors duration-300 ease-in-out">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}