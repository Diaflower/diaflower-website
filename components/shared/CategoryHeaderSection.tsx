import React from 'react'
import Image, { StaticImageData } from "next/image"
import { useRTLAwareStyle } from '@/util/rtl'

interface HeaderSection {
  title: string;
  desc: string;
  image: string | StaticImageData;
  alt: string;
}

const CategoryHeaderSection = ({ title, desc, image, alt }: HeaderSection) => {
  const rtlAwareTextAlign = useRTLAwareStyle('text-left', 'text-right');
  const rtlAwarePadding = useRTLAwareStyle('pl-6 md:pl-12 lg:pl-16', 'pr-6 md:pr-12 lg:pr-16');

  return (
    <section className="w-full mb-10">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[350px] lg:h-[400px]">
          <Image
            priority
            src={image}
            alt={alt}
            quality={85}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className={`w-full md:w-1/2 bg-[#f9f9f9] p-2 flex items-center ${rtlAwarePadding}`}>
          <div className={`w-full space-y-2 md:space-y-4 ${rtlAwareTextAlign}`}>
            <h2 className="text-3xl font-semi-bold sm:text-4xl md:text-5xl">{title}</h2>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHeaderSection