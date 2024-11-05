"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import { Eye, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart-store";

interface SearchProductProps {
  products: Product[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchProduct: React.FC<SearchProductProps> = ({ products, searchTerm, setSearchTerm }) => {
  const router = useRouter();

  const cart = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleCartItem = (product: Product) => {
    cart.addItem(product)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="aspect-square relative flex justify-center items-center">
              <Image
                src={product.images[0].url}
                alt={product.name}
                height={150}
                width={150}
                className="object-cover transition-transform group-hover:scale-105 "
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              
                <Button variant="secondary" size="icon" onClick={() => handleCartItem(product)}>
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 onClick={() => router.push(`/product/${product.id}`)} className="font-semibold text-lg mb-2 truncate hover:underline cursor-pointer">{product.name}</h3>
              <div className="flex items-center justify-between">
                <Currency value={parseFloat(product.price)} />
                <span className="text-sm text-muted-foreground">{product.category.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">No products found.</p>
      )}
    </div>
  );
};

export default SearchProduct;