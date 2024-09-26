import React from 'react'
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { StaticImageData } from 'next/image'

interface HeaderSection {
  category: string;
  imageSrc: string | StaticImageData;
}

export default function CategoryHeaderSection({ category, imageSrc }: HeaderSection) {
  const t = useTranslations('categories')
  const rtlAwareTextAlign = useRTLAwareStyle('md:text-left', 'md:text-right')
  const rtlAwarePadding = useRTLAwareStyle('pl-6 md:pl-12 lg:pl-16', 'pr-6 md:pr-12 lg:pr-16')
  const letterSpacing = useRTLAwareStyle('tracking-widest','')
  const rtlAwareGradient = useRTLAwareStyle(
    'bg-gradient-to-r from-[#e4e4e4] to-[#f9f9f9]',
    'bg-gradient-to-l from-[#e4e4e4] to-[#f9f9f9]'
  )

  return (
    <section className={`w-full md:mb-10 ${rtlAwareGradient}`}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] xl:h-[370px] overflow-hidden">
          <div className="absolute inset-0 scale-[1.1]">
            <Image
              priority
              src={imageSrc}
              alt={t(`${category}.alt`)}
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className={`w-full md:w-2/3 p-4 sm:p-6 md:p-8 lg:p-10 flex items-center ${rtlAwarePadding}`}>
          <div className={`lg:ml-24 xl:ml-32 w-full space-y-3 sm:space-y-4 md:space-y-5 text-center md:text-left md:${rtlAwareTextAlign}`}>
            <h2 className={`${rtlAwareTextAlign} text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold leading-tight ${letterSpacing}`}>
              {t(`${category}.title`)}
            </h2>
            <p className="text-sm text-center text-darkGrey max-w-[600px] mx-auto md:mx-0 md:text-justify">
              {t(`${category}.desc`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}