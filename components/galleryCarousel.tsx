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

    handleResize();
    setIsMounted(true);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full aspect-[16/9] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <Carousel options={OPTIONS}>
        <SliderContainer>
          {isMobile ? (
            mobileImages.map((mobileImage, index) => (
              <Slider className="relative w-full" key={`mobile-${index}`}>
                <div className="relative aspect-[5/5] w-full overflow-hidden rounded-lg">
                  {mobileImage.mobileUrl ? (
                    <Image
                      src={mobileImage.mobileUrl}
                      alt={`Mobile slider image ${index + 1}`}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      priority={index === 0}
                      fill
                      quality={90}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  )}
                </div>
              </Slider>
            ))
          ) : (
            images.map((image, index) => (
              <Slider className="relative w-full" key={image.id}>
                <div className="relative aspect-[20/8] md:aspect-[17/9] w-full overflow-hidden rounded-lg">
                  {image.url ? (  //1080 x 1350 
                    <Image
                      src={image.url}
                      alt={image.name || `Slider image ${index + 1}`}
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                      priority={index === 0}
                      fill
                      quality={90}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  )}
                </div>
              </Slider>
            ))
          )}
        </SliderContainer>

        <div className="flex justify-center py-4">
          <SliderDotButton />
        </div>
      </Carousel>
    </div>
  );
}