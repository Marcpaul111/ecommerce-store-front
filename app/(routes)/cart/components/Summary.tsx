"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart-store";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Successful!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment canceled");
    }
  }, [searchParams, removeAll]);

  const total = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <Currency value={Number(item.price) * item.quantity} />
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Order Total</span>
          <Currency value={total} />
        </div>
      </CardContent>
      <CardFooter>
        {user ? (
          <Button
            className="w-full"
            onClick={onCheckout}
            disabled={isLoading || items.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking out...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </>
            )}
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Summary;