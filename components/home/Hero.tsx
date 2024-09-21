import Image from 'next/image'
import HeroImage from '../../public/Banner-main-min.jpg'

export default function Hero() {
    return (
        <section className="w-full xl:container mx-auto relative mb-10">
            <div className="relative w-full h-[200px] md:h-[400px] lg:h-[500px]">
                <Image
                priority
                src={HeroImage}
                alt= 'test'
                quality={85}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover"
                />
            </div>
        </section>
      
    )
  }