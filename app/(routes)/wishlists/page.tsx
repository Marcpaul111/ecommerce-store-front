"use client"

import Container from '@/components/ui/container/container';
import { Separator } from '@/components/ui/separator';
import useCart from '@/hooks/use-cart-store'
import React from 'react'
import WishListProducts from './component/Wishlists';
import ProductList from './component/ProductList';

const WishlistPage = () => {


    const cart = useCart();
    console.log(cart.wishlist);
    
  return (
    <Container>
        <h3 className='ml-2 text-4xl font-bold my-5'>Wish Lists</h3>
        <Separator />
        <ProductList wishlist={cart.wishlist} />
    </Container>
  )
}

export default WishlistPage