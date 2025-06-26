"use client"

import { useState, useEffect } from "react"
import Image from "next/image"


const videos = [
  "/Videos/heroSectionVideo.MP4",
]

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // Change video every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
              <video
                src="/Videos/heroSectionVideo.MP4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
              />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4">
          Premium Streetwear
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8">Elevate Your Style</p>
        {/* <Button onClick={handleShopClick} size="lg" variant="outline">
          SHOP
        </Button> */}
      </div>
    </div>
        </>
    )
};