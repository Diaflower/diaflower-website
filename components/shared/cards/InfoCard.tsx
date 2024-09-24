import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

type Props = {
    title: string;
    desc: string;
    img: string | StaticImageData;
    alt: string;
    href: string;
}

export default function InfoCard({title, desc,img, alt, href}: Props) {
    const rtlAwareUnderlineStyle = useRTLAwareStyle('left-0', 'right-0');
    const t = useTranslations('home');
    return (
        <div className="w-full relative">
            <div className="relative w-full h-[200px] md:h-[400px] lg:h-[520px]">
            {img && (
                <Image
                priority
                src={img}
                alt={alt}
                quality={85}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
                />
            )}
            </div>
            <div className="p-2 md:p-6 flex flex-col items-center text-center">
                <h2 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2">{title}</h2>
                <p className='hidden md:flex mb-2 md:mb-4 text-sm md:text-base text-gray-600'>
                    {desc}
                </p>
                <Link
                    href={href}
                    className="inline-block relative group"
                    prefetch={false}
                >
                    <span className="relative z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
                        {t('link')}
                    </span>
                    <span className={`absolute bottom-0 ${rtlAwareUnderlineStyle} w-full h-[1px] bg-black transition-all duration-700 ease-in-out group-hover:w-0`}></span>
                </Link>
            </div>
        </div>
    )
}