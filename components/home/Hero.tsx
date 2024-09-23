'use client'

import { useRef, useEffect } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)



  return (
    <section className="w-full xl:container mx-auto relative mb-10">
      <div className="relative w-full h-[200px] md:h-[400px] lg:h-[650px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/newvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}