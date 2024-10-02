'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedImage from './AnimatedImage'

interface AnimatedVariationWrapperProps {
  thumbnailSrc: string
  mainSrc: string
  alt: string
  variationId: number | string
}

const variants = {
  enter: {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(4px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  },
}

export default function AnimatedVariationWrapper({
  thumbnailSrc,
  mainSrc,
  alt,
  variationId
}: AnimatedVariationWrapperProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={variationId}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5, ease: 'easeInOut' },
            scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
            filter: { duration: 0.4, ease: 'easeInOut' },
          }}
          className="absolute inset-0"
        >
          <AnimatedImage
            thumbnailSrc={thumbnailSrc}
            mainSrc={mainSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}