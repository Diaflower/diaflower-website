'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Section from '../../public/section-min.jpg'
import ProductCard from './cards/ProductCard'
import Link from 'next/link'

const CategoryProductsSection = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isDesktop = windowWidth >= 1024

  const renderImageTextSection = () => (
    <div className="bg-muted pb-6 flex flex-col justify-center items-center lg:h-[410px]">
      <Image
        src={Section}
        alt="TANK"
        quality={85}
        className="object-cover w-full h-[300px] mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">TANK</h2>
      <p className="mb-4">The legend, the design, the history.</p>
    <Link
    href={`/`}
    className="inline-block relative group"
    prefetch={false}
    >
    <span className="relative z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
    Discover More
    </span>
    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-700 ease-in-out group-hover:w-0"></span>
    </Link>
    </div>
  )

  const renderGrid = () => {
    const grid = []
    const totalProducts = 10
    const productsBeforeInsert = isDesktop ? 6 : 4

    for (let i = 0; i < totalProducts; i++) {
      if (i > 0 && i % productsBeforeInsert === 0) {
        grid.push(
          <div key={`section-${i}`} className={isDesktop ? "col-span-2 row-span-1" : "col-span-full"}>
            {renderImageTextSection()}
          </div>
        )
      }
      grid.push(
        <div key={`product-${i}`} className="col-span-1">
          <ProductCard />
        </div>
      )
    }
    return grid
  }

  return (
    <div className="w-full md:container mx-auto px-2 md:px-4 md:py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-6 auto-rows-max">
        {renderGrid()}
      </div>
    </div>
  )
}

export default CategoryProductsSection