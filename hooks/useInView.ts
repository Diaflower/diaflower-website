// hooks/useInView.ts
import { useEffect, useState, useRef } from 'react'
import { useInView as useFramerInView } from 'framer-motion'

export function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useFramerInView(ref, { once: true, amount: threshold })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return { ref, isInView: hasAnimated }
}