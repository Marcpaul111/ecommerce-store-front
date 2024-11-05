"use client"

import { Image as ImageType} from "@/types"
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "@/components/gallery/GalleryTab";
import Image from "next/image";

interface GalleryProps{
    images: ImageType[];

}

const Gallery:React.FC<GalleryProps> = ({
    images
}) => {
  return (
   <TabGroup as="div" className="flex flex-col-reverse">
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList className="grid grid-cols-4 gap-6">
                {images.map((image) => (
                    <GalleryTab key={image.id} image={image}/>
                ))}
            </TabList>
        </div>
        <TabPanels className="w-full">
                {images.map((image) => (
                    <TabPanel key={image.id}>
                        <div className="flex justify-center items-center relative h-full w-full sm:rounded-lg overflow-hidden border">
                            <Image 
                            height={400}
                            width={400}
                            src={image.url} 
                            alt="Image"
                            className="object-cover h-auto w-auto object-center"
                            />
                        </div>
                    </TabPanel>
                ))}
        </TabPanels>
   </TabGroup>
  )
}

export default Gallery