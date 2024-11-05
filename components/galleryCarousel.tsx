import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from "@/components/gallery/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoreImage } from "@/types";


interface ImageSliderProps {
    images: StoreImage[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) =>{
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <>
      <Carousel options={OPTIONS}>
        <SliderContainer>
            {images.map((image) => (
                <Slider className="w-full" key={image.id}>
                <div className="dark:bg-black bg-white md:h-[500px] sm:h-full h-[400px] w-full">
                  <Image
                    src={image.url}
                    width={1400}
                    height={900}
                    alt="image"
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              </Slider>
            ))}
          
        </SliderContainer>
  
        <div className="flex justify-center py-2">
          <SliderDotButton />
        </div>
      </Carousel>
    </>
  );
}

export default ImageSlider;
