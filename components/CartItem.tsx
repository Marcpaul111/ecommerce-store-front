"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartIcon, Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCart from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";
import Currency from "./ui/currency";
import Link from "next/link";

export const CartItems: React.FC = () => {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const [showSheet, setShowSheet] = useState(false);

  const router = useRouter();

  const cart = useCart();
  // Calculate total price based on item quantities
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCartItems = () => {
    setShowSheet(false);
    router.push("/cart");
  };

  return (
    <>
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetTrigger asChild>
          <div className="flex ml-auto items-center gap-x-4 relative">
            <ShoppingBag size={30} color="black" className="cursor-pointer" />
            <span className=" text-sm font-medium rounded-full bg-red-600 absolute -top-2 -right-2 text-white px-2">
              {cart.items.length}
            </span>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b ">
                <div className="relative h-16 w-16  overflow-hidden mr-10">
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Currency value={parseFloat(item.price) * item.quantity} />
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                <Currency value={total} />
              </span>
            </div>
            <Button className="w-full" onClick={handleCartItems}>
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
