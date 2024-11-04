"use client";

import { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/user-modal-preview";
import useCart from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  data: Product;
  showBadge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  showBadge = true,
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
    <div
      className="bg-white group cursor-pointer space-y-4 relative min-h-[250px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Images */}
      <div className="aspect-square relative flex items-center justify-center overflow-hidden">
        <Image
          alt={data.name}
          src={data?.images?.[0].url}
          height={100}
          width={150}
          className=" object-cover object-center h-auto w-auto justify-self-center transition-transform duration-300 group-hover:scale-110"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300">
            <div className="absolute top-4 right-4 flex justify-between items-end">
              <div className=" flex flex-col space-y-4">
                <TooltipProvider>
                  <Tooltip>
                    <Button variant="secondary" size="icon" onClick={onPreview}>
                      <TooltipTrigger>
                        <Eye className="h-4 w-4" />
                      </TooltipTrigger>
                    </Button>
                    <TooltipContent>
                      <p>Quick View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Button variant="secondary" size="icon" onClick={handleAddToWishlist}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add To Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </Button>
                </TooltipProvider>
              </div>
            </div>
          </div>
        )}
        {/* Conditionally render the badge */}
        {showBadge && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-pulse">
            New
          </Badge>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground text-center">{data.category?.name}</p>
        <p className="font-semibold truncate">{data.name}</p>
        <Currency value={data.price} />
      </div>
      <Button size="icon" className="w-full" onClick={handleAddToCart}>
        <ShoppingCart className="h-4 w-4" />
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
