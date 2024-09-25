import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { StaticImageData } from 'next/image'

interface HeaderSection {
  category: string;
  imageSrc: string | StaticImageData;
}

const CategoryHeaderSection = ({ category, imageSrc }: HeaderSection) => {
  const t = useTranslations('categories')
  const rtlAwareTextAlign = useRTLAwareStyle('text-left', 'text-right')
  const rtlAwarePadding = useRTLAwareStyle('pl-6 md:pl-12 lg:pl-16', 'pr-6 md:pr-12 lg:pr-16')

  return (
    <section className="w-full mb-10">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
          <Image
            priority
            src={imageSrc}
            alt={t(`${category}.alt`)}
            quality={85}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className={`w-full md:w-1/2 bg-[#f9f9f9] p-4 sm:p-6 md:p-8 lg:p-10 flex items-center ${rtlAwarePadding}`}>
          <div className={`w-full space-y-3 sm:space-y-4 md:space-y-5 text-center md:text-left md:${rtlAwareTextAlign}`}>
            <h2 className={`${rtlAwareTextAlign} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight`}>
              {t(`${category}.title`)}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-[600px] mx-auto md:mx-0 md:text-justify">
              {t(`${category}.desc`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHeaderSection