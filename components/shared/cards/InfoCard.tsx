'use client'
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

type Props = {
    title: string;
    desc: string;
    img: string | StaticImageData;
    alt: string;
    href: string;
    height?:boolean
}

export default function InfoCard({title, desc,img, alt, href,height}: Props) {
    const rtlAwareUnderlineStyle = useRTLAwareStyle('left-0', 'right-0');
    const letterSpacing = useRTLAwareStyle('tracking-widest', '')

    const t = useTranslations('home');
    const { ref, isInView } = useInView(0.2)
   
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
      }
    
      const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            staggerChildren: 0.2,
            delayChildren: 0.2,
            ease: 'easeOut'
          } 
        }
      }
    
      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
      }


    
   
   
    return (
        <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full relative">
            <div className={`relative w-full h-[300px] md:h-[400px] ${height? "lg:h-[450px]":"lg:h-[520px]"}`}>
            <Link
              href={href}
              className="w-full h-full"
              prefetch={false}
            >
                {img && (
                <Image
                priority
                src={img}
                alt={alt}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
                />
            )}
            </Link>
            </div>
            <motion.div
            variants={contentVariants}
            className="p-2 md:p-6 flex flex-col items-center text-center">
                <motion.h2
                variants={itemVariants}
                className={`text-lg md:text-2xl font-semibold mb-1 md:mb-2 ${letterSpacing}`}>{title}</motion.h2>
                <motion.p 
                variants={itemVariants}
                className='mb-2 md:mb-4 text-xs  md:text-base font-roboto text-gray-600'>
                    {desc}
                </motion.p>
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
            </motion.div>
        </motion.div>
    )
}