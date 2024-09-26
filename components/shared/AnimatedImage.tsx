'use client'

import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  thumbnailSrc: string
  mainSrc: string
  alt: string

}

export default function AnimatedImage({
  thumbnailSrc,
  mainSrc,
  alt,
  width,
  height,
  className,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    const img = new window.Image()
    img.src = mainSrc
    img.onload = () => {
      setIsLoaded(true)
      setTimeout(() => setShowPlaceholder(false), 500) // Delay to allow for smooth transition
    }
  }, [mainSrc])

  return (
    <div className={`relative ${className || ''}`} style={{ width, height }}>
      <AnimatePresence>
        {showPlaceholder && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={thumbnailSrc}
              alt={`${alt} thumbnail`}
              fill
              sizes={props.sizes}
              className="object-cover"
              style={{ filter: 'blur(10px)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <Image 
          src={mainSrc} 
          alt={alt} 
          fill
          sizes={props.sizes}
          className="object-cover"
          {...props}
        />
      </motion.div>
    </div>
  )
}