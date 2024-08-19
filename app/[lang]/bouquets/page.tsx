import React from 'react'
import Hero from '@/components/home/Hero'
import { getTranslations } from 'next-intl/server';
import CategoryHeaderSection from '@/components/shared/CategoryHeaderSection';
import CategoryProductsSection from '@/components/shared/CategoryProductsSection';

const page = async ({
  params: {lang}
}: {
  params: {lang: string};
}) => {

  const t = await getTranslations({locale: lang, namespace: 'Metadata'});
  return (
    <main className='w-full'>
      {/* <Hero/> */}
      <CategoryHeaderSection/>
      <CategoryProductsSection/>
    
    </main>
  );
}

export default page