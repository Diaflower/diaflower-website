'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { fetchUserData } from '@/data/user'
import { useAuth } from '@clerk/nextjs'
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from 'next-intl'
import { useRTLAwareStyle } from '@/util/rtl'

type OverviewCardProps = {
  title: string;
  content: React.ReactNode;
  isLoading?: boolean;
}

function OverviewCard({ title, content, isLoading }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-normal'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  )
}

export default function OverviewContent({ lang }: { lang: string }) {
  const { isLoaded, userId, getToken } = useAuth()
  const t = useTranslations('account')
  const rtlPadding = useRTLAwareStyle('pr-4', 'pl-4')

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No authentication token available')
      return fetchUserData(token)
    },
    enabled: isLoaded && !!userId,
  })

  const overviewData = [
    {
      title: t('myProfile'),
      content: (
        <>
          <p>{userData?.firstName} {userData?.lastName}</p>
          <p>{userData?.email}</p>
        </>
      ),
    },
    {
      title: t('myOrders'),
      content: userData?.Order && userData.Order.length > 0 ? (
        <p>{t('orderCount', { count: userData.Order.length })}</p>
      ) : (
        <p>{t('noOrders')}</p>
      ),
    },
    {
      title: t('myAddresses'),
      content: (
        <>
          {userData?.addresses && userData.addresses.length > 0 ? (
            <p>{t('addressCount', { count: userData.addresses.length })}</p>
          ) : (
            <p>{t('noAddresses')}</p>
          )}
          <Link href={`/${lang}/account/addresses/new`} passHref>
            <Button variant="link" className={`p-0 h-auto font-normal ${rtlPadding}`}>{t('addNewAddress')}</Button>
          </Link>
        </>
      ),
    },
    {
      title: t('myWishList'),
      content: <p>{t('emptyWishList')}</p>,
    },
  ]

  if (isError) {
    return <div>{t('errorFetchingUserData')}</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {overviewData.map((data, index) => (
        <OverviewCard key={index} title={data.title} content={data.content} isLoading={!isLoaded || isLoading} />
      ))}
    </div>
  )
}