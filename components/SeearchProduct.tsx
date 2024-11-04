"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";

interface SearchProductProps {
  products: Product[];
}

const SearchProduct: React.FC<SearchProductProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
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