"use client"

import { ShoppingCart } from "lucide-react";
import parse from 'html-react-parser'

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "./ui/ModButton";
import useCart from "@/hooks/use-cart-store";

interface ProductInfoProps {
  data: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {

 
  const cart = useCart()

  const handleAddToCart = () => {

    cart.addItem(data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="flex mt-3 items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size: {data?.size?.name}</h3>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color: </h3>
          <div
            className="w-6 h-6 rounded-md border border-gray-700"
            style={{ backgroundColor: data.color.value }}
          />
        </div>
      </div>
      <div className="my-3 font-semibold text-gray-600 text-opacity-80 text-base">
        {parse(data.description)}
      </div>
      <div className="mt-10 flex gap-x-3">
        <Button onClick={handleAddToCart}  className="flex items-center gap-x-2 rounded-lg">
          Add To Cart 
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
