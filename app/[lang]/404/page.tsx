'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function Custom404() {
  const t = useTranslations('common')
  const [mounted, setMounted] = useState(false)
  const { lang } = useParams()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-fancy text-pink-600 mb-4">{t('404.title')}</h1>
        <p className="text-xl text-gray-600 mb-8 font-roboto">{t('404.message')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative w-64 h-64 mb-8"
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              rotate: index * 72,
              originX: 0.5,
              originY: 0.5,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2,
              }}
              className="w-16 h-16 absolute top-0 left-1/2 -ml-8"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-pink-400">
                <path d="M50 0 C60 40 90 50 50 100 C10 50 40 40 50 0" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href={`/${lang}`}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('404.backHome')}
        </Link>
      </motion.div>
    </div>
  )
}