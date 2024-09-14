import { useTranslations } from 'next-intl';
import Hero from '@/components/home/Hero';
import InfoCard from '@/components/shared/cards/InfoCard';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import sectionImage from '../../public/section-min.jpg'
import CategorySection from '@/components/shared/CategorySection';

export default function Home({
  params: { lang }
}: {
  params: { lang: string };
}) {
  const t = useTranslations('home');

  return (
    <main className='w-full'>
      <Hero />
      <ProductCarousel />
      <section className='flex flex-col my-3 md:flex-row w-full md:container md:gap-8'>
        <InfoCard
          location='homepage'
          title={t('infoCards.card1.title')}
          desc={t('infoCards.card1.description')}
          link={t('infoCards.card1.link')}
          href='/'
          alt={t('infoCards.card1.alt')}
          img={sectionImage}
        />
        <InfoCard
          location='homepage'
          title={t('infoCards.card2.title')}
          desc={t('infoCards.card2.description')}
          link={t('infoCards.card2.link')}
          href='/'
          alt={t('infoCards.card2.alt')}
          img={sectionImage}
        />
      </section>

      <section className='flex w-full md:container my-3'>
        <InfoCard
          location='homepage'
          title={t('infoCards.card3.title')}
          desc={t('infoCards.card3.description')}
          link={t('infoCards.card3.link')}
          href='/'
          alt={t('infoCards.card3.alt')}
          img={sectionImage}
        />
      </section>

      <section className='flex w-full md:container my-3'>
        <InfoCard
          location='homepage'
          title={t('infoCards.card4.title')}
          desc={t('infoCards.card4.description')}
          link={t('infoCards.card4.link')}
          href='/'
          alt={t('infoCards.card4.alt')}
          img={sectionImage}
        />
      </section>
      
      <CategorySection />
    </main>
  );
}