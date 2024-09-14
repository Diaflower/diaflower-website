'use client'

import { useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from 'next-intl'

export function AccountHeader() {
  const { user, isLoaded } = useUser()
  const t = useTranslations('account')

  return (
    <header className="bg-[#f9f9f9] py-12 md:py-16 px-4">
      <div className="flex flex-col gap-5 container mx-auto text-center">
        {!isLoaded ? (
          <>
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </>
        ) : user ? (
          <>
            <h1 className="text-2xl font-semibold mb-2">{t('welcome', { name: user.firstName || t('user') })}</h1>
            <p className="text-sm text-muted-foreground">{t('manageExperience')}</p>
          </>
        ) : (
          <h1 className="text-2xl font-semibold mb-2">{t('welcomeGuest')}</h1>
        )}
      </div>
    </header>
  )
}