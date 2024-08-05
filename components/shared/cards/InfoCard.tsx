import Link from "next/link"
import Image, { StaticImageData } from "next/image"

type Props = {
    title:string;
    desc:string;
    link:string;
    img:string | StaticImageData;
    linkActive?:boolean;
    alt:string;
    href:string;
}


export default function InfoCard({title,desc,link,img,alt,href}:Props) {
  
    return (
    <div className="w-full">
      {img && 
      <Image
      src={img}
      alt={alt}
      className="w-full h-[500px] object-cover"
    //   style={{ aspectRatio: "600/300", objectFit: "cover" }}
    />
      }

      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {desc && 
        <p className="mb-4">
         {desc}
        </p>
        }
         
         {
        link &&
        <Link
        href= {href}
        className="inline-block hover:border-b-2 hover:border-primary transition-colors duration-300"
        prefetch={false}
        >
         {link}
        </Link>
        
         }
      </div>
    </div>
  )
}