import { useTranslations } from 'next-intl'
import Hero from '@/components/home/Hero'
import InfoCard from '@/components/shared/cards/InfoCard'
import AnimatedContent,{AnimatedSection} from '@/components/shared/AnimatedContent'
import crystalImage from '@/public/images/Heart.jpg'
import vaseImage from '@/public/Vase.jpg'
import leatherImage from '@/public/Leatherbag.jpg'
import bouqetImage from '@/public/bouquet.jpg'
import arrangementImage from '@/public/images/arrang.jpeg'
import treasureImage from '@/public/images/treasure.jpg'

export default function Home({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const t = useTranslations('home')

  return (
    <main className='w-full'>
      <AnimatedContent>
        <Hero title1={t('hero.title1')} title2={t('hero.title2')} lang={lang} />
        
        <AnimatedSection>
          <div className='flex flex-col md:flex-row w-full md:container my-3 gap-4 md:gap-8'>
            <InfoCard
              title={t('card1.title')}
              desc={t('card1.description')}
              href='/divine'
              alt={t('card1.alt')}
              img={crystalImage}
            />
            <InfoCard
              title={t('card2.title')}
              desc={t('card2.description')}
              href='/treasure'
              alt={t('card2.alt')}
              img={treasureImage}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className='flex w-full md:container my-3'>
            <InfoCard
              title={t('card5.title')}
              desc={t('card5.description')}
              href='/box-arrangement'
              alt={t('card5.alt')}
              img={arrangementImage}
            />
          </div>
        </AnimatedSection>
       
        <AnimatedSection>
          <div className='flex flex-col md:flex-row w-full md:container my-3 gap-4 md:gap-4'>
            <InfoCard
              title={t('card4.title')}
              desc={t('card4.description')}
              href='/bouquets'
              alt={t('card4.alt')}
              img={bouqetImage}
              height
            />
            <InfoCard
              title={t('card7.title')}
              desc={t('card7.description')}
              href='/leather'
              alt={t('card7.alt')}
              img={leatherImage}
              height
            />
            <InfoCard
              title={t('card8.title')}
              desc={t('card8.description')}
              href='/vases'
              alt={t('card8.alt')}
              img={vaseImage}
              height
            />
          </div>
        </AnimatedSection>
      </AnimatedContent>
    </main>
  )
}