'use client'

import { useState } from 'react'
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const t = useTranslations('common')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const phoneNumber = '+971554227757'
  const message = encodeURIComponent(t('header.contactUs'))
  

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`fixed bottom-4 z-50 ${isRTL ? 'left-4' : 'right-4'}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Link
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 px-4 py-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <MessageCircle size={24} />
                <span className={`${isHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'} overflow-hidden transition-all duration-300`}>
                  {t('header.contactUs')}
                </span>
                <motion.div
                  className="absolute -inset-0.5 rounded-full bg-green-400 opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </Button>
            </Link>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={isRTL ? "right" : "left"}>
          <p>{t('header.contactUs')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}