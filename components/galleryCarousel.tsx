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
                <div className="dark:bg-black bg-white md:h-[500px] sm:h-full h-[300px] w-full">
                  <Image
                    src={image.url}
                    width={1400}
                    height={800}
                    alt="image"
                    className="h-full object-cover rounded-lg w-full"
                  />
                </div>
              </Slider>
            ))}
          
        </SliderContainer>
        <SliderPrevButton className="absolute top-[50%] p-2 border-2 rounded-full left-4 dark:bg-black/25 dark:border-white  bg-white/25 backdrop-blur-sm text-black disabled:opacity-20">
          <ChevronLeft className="w-8 h-8 " />
        </SliderPrevButton>
        <SliderNextButton className="absolute right-4 p-2 border-2 rounded-full top-[50%] dark:bg-black/25 dark:border-white  bg-white/25 backdrop-blur-sm text-black disabled:opacity-20">
          <ChevronRight className="w-8 h-8" />
        </SliderNextButton>
        <div className="flex justify-center py-2">
          <SliderDotButton />
        </div>
      </Carousel>
    </>
  );
}

export default ImageSlider;
