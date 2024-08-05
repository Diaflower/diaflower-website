import HeroImage from '../../public/Banner-main.jpg'
import Image from 'next/image'

export default function Hero() {
    return (
      
        <section className="w-full md:container mx-auto relative">
          <Image
            objectFit='cover'
            src={HeroImage}
          
            alt="Blooms"
            className="w-full h-[300px] md:h-[560px] object-cover"
            // style={{objectFit: "cover" }}
          />
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Blooms</h1>
            <p className="mt-4 text-lg md:text-xl text-white">Immerse yourself in the beauty of blooms</p>
          </div> */}
        </section>
      
    )
  }