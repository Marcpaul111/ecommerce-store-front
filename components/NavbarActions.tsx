"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartIcon, Search, UserIcon } from "lucide-react";
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
import SearchProduct from "./SeearchProduct";
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
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isSearching ? (
              <div className="text-center">Searching...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <SearchProduct products={products} />
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
      {/* User Button */}
      {/* IF signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* if signed out */}
      <SignedOut>
        <SignInButton>
          <UserIcon size={30} cursor={"pointer"} />
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;
