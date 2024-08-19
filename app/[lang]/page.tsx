
import {getTranslations} from 'next-intl/server';
import Hero from '@/components/home/Hero';
import InfoCard from '@/components/shared/cards/InfoCard';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import sectionImage from '../../public/section-min.jpg'
import CategorySection from '@/components/shared/CategorySection';

export default async function Home({
  params: {lang}
}: {
  params: {lang: string};
}) {

  const t = await getTranslations({locale: lang, namespace: 'Metadata'});
  return (
    <main className='w-full'>
      <Hero/>
      <ProductCarousel/>
      <section className='flex flex-col my-3 md:flex-row w-full md:container md:gap-8'>
         <InfoCard
         location='homepage'
         title='SUNSHINE JEWELS'
         desc='Jewllery collection as delicious as a Parisian rendez-vous in the heart of summer'
         link='Discover the selection'
         href='/'
         alt='section image'
         img= {sectionImage}
         />
         <InfoCard
         location='homepage'
         title='SUNSHINE JEWELS'
         desc='Jewllery collection as delicious as a Parisian rendez-vous in the heart of summer'
         link='Discover the selection'
         href='/'
         alt='section image'
         img= {sectionImage}
         />
      </section>

      <section className='flex w-full md:container my-3'>
       <InfoCard
       location='homepage'
         title='SUNSHINE JEWELS'
         desc='Jewllery collection as delicious as a Parisian rendez-vous in the heart of summer'
         link='Discover the selection'
         href='/'
         alt='section image'
         img= {sectionImage}
         />
      </section>

      <section className='flex w-full md:container my-3'>
       <InfoCard
       location='homepage'
         title='SUNSHINE JEWELS'
         desc='Jewllery collection as delicious as a Parisian rendez-vous in the heart of summer'
         link='Discover the selection'
         href='/'
         alt='section image'
         img= {sectionImage}
         />
      </section>
      
      <CategorySection/>
       
    </main>
  );
}