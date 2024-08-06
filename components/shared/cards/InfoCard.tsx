import Link from "next/link"
import Image, { StaticImageData } from "next/image"

type Props = {
    title: string;
    desc: string;
    link: string;
    img: string | StaticImageData;
    linkActive?: boolean;
    alt: string;
    href: string;
}

export default function InfoCard({title, desc, link, img, alt, href}: Props) {
    return (
        <div className="w-full">
            {img &&
                <Image
                    src={img}
                    alt={alt}
                    className="w-full h-[500px] object-cover"
                />
            }
            <div className="p-6 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                {desc &&
                    <p className="mb-4">
                        {desc}
                    </p>
                }
                {link &&
                    <Link
                        href={href}
                        className="inline-block relative group"
                        prefetch={false}
                    >
                        <span className="relative z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
                            {link}
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-700 ease-in-out group-hover:w-0"></span>
                    </Link>
                }
            </div>
        </div>
    )
}