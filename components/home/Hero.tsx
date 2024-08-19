import HeroImage from '../../public/Banner-main-min.jpg'
import InfoCard from '../shared/cards/InfoCard'

export default function Hero() {
    return (
      
        <section className="w-full xl:container mx-auto relative mb-3">
          <InfoCard
          location='homepage'
         title='SUNSHINE JEWELS'
         desc='Jewllery collection as delicious as a Parisian rendez-vous in the heart of summer'
         link='Discover the selection'
         href='/'
         alt='section image'
         img= {HeroImage}
         />
        </section>
      
    )
  }