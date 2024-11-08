'use client'

import React, { useState, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
} from "@/components/gallery/carousel";
import Image from "next/image";
import { StoreImage } from "@/types";

interface ImageSliderProps {
  images: StoreImage[];
  mobileImages: StoreImage['mobileImages'][];
}

export default function ImageSlider({ images, mobileImages }: ImageSliderProps) {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Set initial state
    handleResize();
    setIsMounted(true);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="w-full h-[400px] sm:h-[400px]  md:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <Carousel options={OPTIONS}>
      <SliderContainer>
        {isMobile ? (
          mobileImages.map((mobileImage, index) => (
            <Slider className="w-full" key={`mobile-${index}`}>
              <div className="dark:bg-black bg-white md:h-[300px] h-[400px] w-full">
                {mobileImage.mobileUrl ? (
                  <Image
                    src={mobileImage.mobileUrl}
                    width={700}
                    height={400}
                    alt={`Mobile slider image ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                    priority={index === 0}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
                )}
              </div>
            </Slider>
          ))
        ) : (
          images.map((image, index) => (
            <Slider className="w-full" key={image.id}>
              <div className="dark:bg-black bg-white  md:h-[500px] sm:h-full h-[400px] w-full">
                {image.url ? (
                  <Image
                    src={image.url}
                    width={1200}
                    height={900}
                    alt={image.name || `Slider image ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                    priority={index === 0}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
                )}
              </div>
            </Slider>
          ))
        )}
      </SliderContainer>

      <div className="flex justify-center py-2">
        <SliderDotButton />
      </div>
    </Carousel>
  );
}