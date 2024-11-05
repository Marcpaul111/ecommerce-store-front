"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartIcon, Search, SearchIcon, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart-store";
import { CartItems } from "@/components/CartItem";
import SearchProduct from "@/components/SeearchProduct";
import getProducts from "@/actions/get-products";
import { Product } from "@/types";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm) {
        setIsSearching(true);
        setError(null);
        try {
          const fetchedProducts = await getProducts({ name: searchTerm });
          setProducts(fetchedProducts);
        } catch (err) {
          console.error("Error fetching products:", err);
          if (err instanceof Error && err.message.includes("CORS")) {
            setError(
              "Unable to access the API. Please check your network connection or try again later."
            );
          } else {
            setError("Failed to fetch products. Please try again.");
          }
          toast.error("Error searching products");
        } finally {
          setIsSearching(false);
        }
      } else {
        setProducts([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4 ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <SearchIcon size={30} />
        </PopoverTrigger>
        <PopoverContent className="w-[90vw] max-w-4xl">
          <div className="space-y-4">
            {isSearching ? (
              <div className="text-center">Searching...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <SearchProduct
                products={products}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
      <Link href="/wishlists" className="relative">
        <HeartIcon size={30} />
        <span className="text-sm font-medium rounded-full bg-red-600 absolute -top-2 -right-2 text-white px-2">
          {cart.wishlist.length}
        </span>
      </Link>
      <CartItems />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <UserIcon size={30} cursor={"pointer"} />
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;
