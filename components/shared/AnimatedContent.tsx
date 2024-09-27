'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedContentProps {
  children: ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.2
    } 
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  }
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSection({ children }: AnimatedContentProps) {
  return (
    <motion.section variants={sectionVariants}>
      {children}
    </motion.section>
  )
}