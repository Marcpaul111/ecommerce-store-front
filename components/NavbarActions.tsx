"use client"

import { Button } from "@/components/ui/ModButton"
import useCart from "@/hooks/use-cart-store"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const router = useRouter()
    const cart = useCart()

if (!isMounted) {
    return null
}

    return (
        <div className="flex ml-auto items-center gap-x-4">
            <Button className="flex items-center rounded-full bg-black">
                <ShoppingBag onClick={() => router.push("/cart")} size={20} color="white"  />
                <span className="ml-2 text-sm font-medium">{cart.items.length}</span>
            </Button>
        </div>
    )
}

export default NavbarActions