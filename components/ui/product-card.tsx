"use client";

import { useState, MouseEventHandler } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/user-modal-preview";
import useCart from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  data: Product;
  showBadge?: boolean;
  isCarouselUrl?: boolean; 
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  showBadge = true,
  isCarouselUrl = false,
}) => {
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const handleAddToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addToWishlist(data);
  };

  return (
    <TooltipProvider>
      <div
        className="bg-white group cursor-pointer space-y-4 relative min-h-[250px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={!isCarouselUrl ? handleClick : undefined} 
      >
        {/* Images */}
        <div className="aspect-square relative flex items-center justify-center overflow-hidden">
          <Image
            alt={data.name}
            src={data?.images?.[0].url}
            height={100}
            width={150}
            className="object-cover object-center h-auto w-[180px] justify-self-center transition-transform duration-300 group-hover:scale-110"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300">
              <div className="absolute top-4 right-4 flex justify-between items-end">
                <div className="flex flex-col space-y-4">
                  <Tooltip>
                    <TooltipTrigger onClick={onPreview} className="rounded-full shadow-md text-black p-2 bg-white">
                      <Eye className="h-4 w-4" />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Quick View</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger onClick={handleAddToWishlist} className="rounded-full shadow-md text-black p-2 bg-white">
                      <Heart className="h-4 w-4" />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Add To Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          )}

          {showBadge && (
            <div className="absolute top-0 left-0 bg-red-500 text-white px-5 text-sm">
              New
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground text-center">
            {data.category?.name}
          </p>
          <p
            className="font-semibold truncate hover:underline hover:font-bold"
            onClick={isCarouselUrl ? handleClick : undefined} 
          >
            {data.name}
          </p>
          <Currency value={data.price} />
        </div>

        {/* Separate button to add to cart */}
        <Button size="icon" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4" />
          Add To Cart
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default ProductCard;
