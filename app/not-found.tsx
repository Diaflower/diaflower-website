'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootNotFound() {
  const router = useRouter()

  useEffect(() => {
    const path = window.location.pathname
    const langMatch = path.match(/^\/([a-z]{2})/)
    const lang = langMatch ? langMatch[1] : 'en'
    router.replace(`/${lang}/404`)
  }, [router])

  return null
}