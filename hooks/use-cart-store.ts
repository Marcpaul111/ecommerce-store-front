// hooks/use-cart-store.ts
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from '@/types';

interface CartStore {
  items: (Product & { quantity: number })[];
  wishlist: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  addToWishlist: (data: Product) => void;
  removeFromWishlist: (id: string) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    wishlist: [],

    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast('Item already in cart.');
      }

      set({ items: [...get().items, { ...data, quantity: 1 }] });
      toast.success('Item added to cart.');
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Item removed from cart.');
    },
    removeAll: () => set({ items: [] }),
    increaseQuantity: (id: string) => {
      set({
        items: get().items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    },
    decreaseQuantity: (id: string) => {
      set({
        items: get().items.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter((item) => item.quantity > 0),
      });
    },

    addToWishlist: (data: Product) => {
      const currentWishlist = get().wishlist;
      const existingItem = currentWishlist.find((item) => item.id === data.id);

      if (existingItem) {
        return toast('Item already in wishlist.');
      }

      set({ wishlist: [...get().wishlist, data] });
      toast.success('Item added to wishlist.');
    },
    removeFromWishlist: (id: string) => {
      set({ wishlist: get().wishlist.filter((item) => item.id !== id) });
      toast.success('Item removed from wishlist.');
    },
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
);

export default useCart;
