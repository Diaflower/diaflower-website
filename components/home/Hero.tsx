'use client'
import { useRef} from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

type Props = {
  title1: string;
  title2: string;
  lang:string;
}

export default function Hero({title1,title2,lang}: Props) {
  const { ref, isInView } = useInView()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    className="w-full xl:container mx-auto relative flex flex-col items-center">
      <div className="relative w-full h-[200px] md:h-[400px] lg:h-[550px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/newvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
      <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      className={`my-4 md:my-10 text-xl md:text-2xl text-center flex ${lang === 'en' && "test"}`}>
      {title1} <span className='hidden md:flex'>.</span> {title2}
      </motion.h1>
    </motion.section>
  )
}