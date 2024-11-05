"use client"

import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ProductListsProps {
  title: string;
  items: Product[];
  showBadge?: boolean;
  limit?: number;
  href?: string;
  isCarousel?: boolean; // Prop for carousel mode
}

const ProductLists: React.FC<ProductListsProps> = ({
  title,
  items,
  showBadge = false,
  limit,
  href,
  isCarousel = false, // Default to false
}) => {
  const displayedItems = limit ? items.slice(0, limit) : items;
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [carouselRef, items]);

  return (
    <div className="space-y-10 my-12">
      <div className="relative flex items-center justify-center">
        <Separator className="absolute top-1/2 w-full transform -translate-y-1/2 text-lg bg-gray-900" />
        <h3 className="relative z-10 font-bold text-3xl bg-white text-center px-10">
          {title}
        </h3>
      </div>

      {items.length === 0 && <NoResult />}

      {isCarousel ? ( // Check if in carousel mode
        <div className='w-full overflow-hidden'>
          <motion.div
            ref={carouselRef}
            drag='x'
            whileDrag={{ scale: 0.95 }}
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='flex will-change-transform cursor-grab active:cursor-grabbing'
          >
            {displayedItems.map((item) => (
              <motion.div key={item.id} className='min-w-[20rem] sm:min-w-[20rem] min-h-[25rem] p-2'>
                <ProductCard data={item} showBadge={showBadge} isCarouselUrl={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {displayedItems.map((item) => (
            <ProductCard key={item.id} data={item} showBadge={showBadge} />
          ))}
        </div>
      )}

      {limit && href && (
        <div className="flex justify-center items-center my-12">
          <Link href={href}>
            <h2 className="text-lg font-medium underline hover:font-bold">
              See All
            </h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductLists;
