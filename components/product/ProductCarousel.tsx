import * as React from "react"
import ProductCard from "../shared/cards/ProductCard"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { ChevronLeft, ChevronRight } from "lucide-react"



export function ProductCarousel() {
  return (
    <section className="w-full container my-3">
       <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      // className="w-full container mt-16 overflow-hidden"
    >
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4">
            <div className="">
               <ProductCard/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground hover:bg-background/75 focus:outline-none">
        <ChevronLeft className="h-6 w-6" />
      </CarouselPrevious>
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground hover:bg-background/75 focus:outline-none">
        <ChevronRight  className="h-6 w-6" />
      </CarouselNext>
    </Carousel>
    </section>
  )
}
