import React from 'react'
import Image, { StaticImageData } from "next/image"
import Section from '../../public/section-min.jpg'

interface HeaderSection {
    title: string;
    desc: string;
    image: number;
    img: string | StaticImageData;
    alt: string;
  }

const CategoryHeaderSection = () => {
  return (
    <section className="w-full mb-10 ">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[350px] lg:h-[400px]">
          <Image
                priority
                src={Section}
                alt="Two models wearing Tank watches"
                // alt={alt}
                quality={85}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
                />
        </div>
        <div className="w-full md:w-1/2 bg-[#f9f9f9] p-2 md:p-12 lg:p-16 flex items-center">
          <div className="w-full space-y-2 md:space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">BOUQUETS</h2>
            <p className="max-w-[600px] mx-auto md:mx-0 text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The Tank watch was created by Louis Cartier, who designed it after the tanks of WWI battlefields. Defined by flat vertical brancards and a sapphire cabochon, this symbol of understated elegance has since captivated the world&apos;s most astute minds.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHeaderSection