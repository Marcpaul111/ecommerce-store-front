"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container/container";
import useCart from "@/hooks/use-cart-store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartItems from "./components/CartItems";
import Summary from "./components/Summary";

const Cart = () => {
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-center gap-x-12">
            <div className="lg:col-span-7 border-2 shadow-md rounded-lg">
            {cart.items.length === 0 && (
                <div className="flex flex-col justify-center items-center gap-y-4 my-10">
                  <Image
                    src="/assets/images/emptycart.png"
                    alt=""
                    height={200}
                    width={200}
                  />
                  <p className="text-neutral-500">No item in your cart</p>

                  <Button className="rounded-md mt-10">
                    <Link href={"/"}>
                        Shop Now
                    </Link>
                  </Button>
                </div>
              )}

              <ul>
                {cart.items.map((item) => (
                    <CartItems 
                    key={item.id}
                    data={item}
                    />
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
