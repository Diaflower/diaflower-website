import { useTranslations } from 'next-intl';
import Hero from '@/components/home/Hero';
import InfoCard from '@/components/shared/cards/InfoCard';
import sectionImage from '@public/section-min.jpg'



//////

export default function Home({
  params: { lang }
}: {
  params: { lang: string };
}) {
  const t = useTranslations('home');

  return (
    <main className='w-full'>
      <Hero />
      <section className='flex w-full md:container my-3 gap-3'>
        <InfoCard
          title={t('card1.title')}
          desc={t('card1.description')}
          href='/'
          alt={t('card1.alt')}
          img={sectionImage}
        />
        <InfoCard
           title={t('card2.title')}
           desc={t('card2.description')}
           href='/'
           alt={t('card2.alt')}
           img={sectionImage}
        />
      </section>


      <section className='flex w-full md:container my-3'>
        <InfoCard
          title={t('card3.title')}
          desc={t('card3.description')}
          href='/'
          alt={t('card3.alt')}
          img={sectionImage}
        />
      </section>
     
      <section className='flex w-full md:container my-3 gap-3'>
        <InfoCard
            title={t('card4.title')}
            desc={t('card4.description')}
            href='/'
            alt={t('card4.alt')}
            img={sectionImage}
        />
        <InfoCard
            title={t('card5.title')}
            desc={t('card5.description')}
            href='/'
            alt={t('card5.alt')}
            img={sectionImage}
        />
      </section>

      {/* <section className='flex w-full md:container my-3'>
        <InfoCard
           title={t('card6.title')}
           desc={t('card6.description')}
           href='/'
           alt={t('card6.alt')}
           img={sectionImage}
        />
      </section> */}

      <section className='flex w-full md:container my-3 gap-3'>
        <InfoCard
           title={t('card7.title')}
           desc={t('card7.description')}
           href='/'
           alt={t('card7.alt')}
           img={sectionImage}
        />
        <InfoCard
           title={t('card7.title')}
           desc={t('card7.description')}
           href='/'
           alt={t('card7.alt')}
           img={sectionImage}
        />
        <InfoCard
            title={t('card8.title')}
            desc={t('card8.description')}
            href='/'
            alt={t('card8.alt')}
            img={sectionImage}
        />
      </section>
    </main>
  );
}