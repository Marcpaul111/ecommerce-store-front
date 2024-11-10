"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container/container";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart-store";
import Summary from "./components/Summary";
import EmptyCart from '../../../public/assets/images/emptycart.png';

const CartPage = () => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

const cartItems = cart.items.map(item => item)
console.log(cartItems);

  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-background">
      <Container>
        <div className="py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <Card className="lg:col-span-7">
              <CardContent>
                {cart.items.length === 0 ? (
                  <div className="flex flex-col justify-center items-center gap-y-4 py-10">
                    <Image
                      src={EmptyCart}
                      alt="Empty Cart"
                      height={200}
                      width={200}
                    />
                    <p className="text-muted-foreground">No items in your cart</p>
                    <Button asChild className="mt-4">
                      <Link href="/">
                        Shop Now
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {cart.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                          <Image 
                            fill
                            src={item.images[0].url}
                            alt={item.name}
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-foreground">
                              <h3>{item.name}</h3>
                              <Currency value={Number(item.price) * Number(item.quantity)} />
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.color.name} | {item.size.name}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => cart.decreaseQuantity(item.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => cart.increaseQuantity(item.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <IconButton 
                              onClick={() => cart.removeItem(item.id)} 
                              icon={<X size={15} />}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <div className="lg:col-span-5">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;