import React from 'react'
import Hero from '@/components/home/Hero'
import { getTranslations } from 'next-intl/server';

const page = async ({
  params: {lang}
}: {
  params: {lang: string};
}) => {

  const t = await getTranslations({locale: lang, namespace: 'Metadata'});
  return (
    <main className='w-full'>
      <Hero/>
     
    </main>
  );
}

export default page