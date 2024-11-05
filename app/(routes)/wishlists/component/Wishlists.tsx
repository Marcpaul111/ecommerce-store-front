"use client";

import { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { ShoppingCart, Heart, Eye, X } from "lucide-react";
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

interface WishListProductsProps {
  data: Product;
  showBadge?: boolean;
}

const WishListProducts: React.FC<WishListProductsProps> = ({
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
    cart.removeFromWishlist(data.id);
  };

  const handleRemoveToWishlist: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    cart.removeFromWishlist(data.id);
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
          height={220}
          width={200}
          className=" object-cover h- w-[180px] object-center justify-self-center transition-transform duration-300 group-hover:scale-110"
        />
        {isHovered && (
          <TooltipProvider>
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300">
              <div className="absolute top-4 right-4 flex justify-between items-end">
                <div className=" flex flex-col space-y-4">
                  <Tooltip>
                    <TooltipTrigger onClick={handleRemoveToWishlist} className="rounded-full shadow-md text-black p-2 bg-white">
                      <X className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove From Wishlist</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger onClick={onPreview} className="rounded-full shadow-md text-black p-2 bg-white">
                      <Eye className="h-4 w-4" />
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Quick View</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </TooltipProvider>
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
        <p className="text-sm text-muted-foreground text-center">
          {data.category?.name}
        </p>
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

export default WishListProducts;
