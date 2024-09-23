'use client'

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import labelle from '../../public/LaBelle-min.jpg'

interface Category {
  name: string;
  image: typeof labelle;
}

const categories: Category[] = [
  { name: "RINGS", image: labelle },
  { name: "BRACELETS", image: labelle },
  { name: "NECKLACES", image: labelle },
  { name: "EARRINGS", image: labelle },
]

const CategoryItem: React.FC<{ category: Category; index: number }> = React.memo(({ category, index }) => (
  <div className={`flex-1 ${index !== 0 ? 'md:ml-6 lg:ml-12' : ''}`}>
    <Image
      alt={category.name}
      className="object-cover w-full h-80"
      src={category.image}
      width={300}
      height={300}
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg">{category.name}</h3>
    </div>
  </div>
))
CategoryItem.displayName = 'CategoryItem'

export default function CategorySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

    emblaApi.on("select", onSelect)
    onSelect() // Call once to initialize

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, setSelectedIndex])

  return (
    <section className="w-full container py-4 mb-6 bg-[#f9f9f9]">
      <div className="">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">TRINITY</h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Discover the Trinity collection
          </p>
        </div>
        <div className="mx-auto mt-12 hidden md:flex">
          {categories.map((category, index) => (
            <CategoryItem key={category.name} category={category} index={index} />
          ))}
        </div>
        <div className="mt-12 md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {categories.map((category) => (
                <div className="flex-[0_0_100%] min-w-0 pl-4 relative" key={category.name}>
                  <CategoryItem category={category} index={0} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === selectedIndex ? "bg-zinc-950" : "bg-zinc-200"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}