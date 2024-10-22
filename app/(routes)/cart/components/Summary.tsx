"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart-store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);

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
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
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
    <div className="mt-16 rounded-lg bg-gray-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-lg">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t-2 border-gray-500 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={total} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          className="my-6 w-32" 
          onClick={onCheckout} 
          disabled={isLoading || items.length === 0}
        >
          {isLoading ? (
            <p className="flex gap-x-2"><Loader2 className="h-2 w-2 animate-spin"/> <span>Checking out...</span></p>
          ) : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default Summary;