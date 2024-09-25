import { useTranslations } from 'next-intl';
import Hero from '@/components/home/Hero';
import InfoCard from '@/components/shared/cards/InfoCard';
import sectionImage from '../../public/section-min.jpg'
import crystalImage from '@/public/crystal.jpg'
import vaseImage from '@/public/Vase.jpg'
import leatherImage from '@/public/Leatherbag.jpg'
import bouqetImage from '@/public/bouquet.jpg'



//////
////
export default function Home({
  params: { lang }
}: {
  params: { lang: string };
}) {
  const t = useTranslations('home');

  return (
    <main className='w-full'>
      <Hero title1={t('hero.title1')} title2={t('hero.title2')} lang={lang} />
      <section className='flex flex-col md:flex-row w-full md:container my-3 gap-4 md:gap-8'>
        <InfoCard
          title={t('card1.title')}
          desc={t('card1.description')}
          href='/'
          alt={t('card1.alt')}
          img={crystalImage}
        />
        <InfoCard
           title={t('card2.title')}
           desc={t('card2.description')}
           href='/'
           alt={t('card2.alt')}
           img={bouqetImage}
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
     
      <section className='flex flex-col md:flex-row w-full md:container my-3 gap-4 md:gap-8'>
        <InfoCard
            title={t('card4.title')}
            desc={t('card4.description')}
            href='/'
            alt={t('card4.alt')}
            img={vaseImage}
        />
        <InfoCard
            title={t('card5.title')}
            desc={t('card5.description')}
            href='/'
            alt={t('card5.alt')}
            img={leatherImage}
        />
      </section>
    </main>
  );
}