import Container from "@/components/ui/container/container";
import Link from "next/link";
import MainNav from "@/components/MainNav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/NavbarActions";
import getStoreBanners from "@/actions/get-store-banners";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HeartIcon, MenuIcon, Store } from "lucide-react";
import MobileNav from "./mobileNav";

const Navbar = async () => {
  const categories = await getCategories();
  const {desktopBanners} = await getStoreBanners();

  const logoUrl = desktopBanners[0]?.logoUrl || null; 

  const LogoComponent = () => {
    if (logoUrl) {
      return (
        <Image 
          src={logoUrl} 
          width={100} 
          height={100} 
          alt="Store logo"
          className="h-[80px] w-auto object-contain"
          priority
        />
      );
    }
    return <Store className="h-8 w-8" />;
  };

  return (
    <div className="border-b shadow-md fixed top-0 w-full z-50 bg-white">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Link
              href="#"
              className="mr-6 hidden lg:flex ml-4 lg:ml-0 gap-x-2 "
              prefetch={false}
            >
              <p className="font-bold text-xl">
               <LogoComponent />
              </p>
            </Link>
            <div className="grid gap-2 py-6">
              <MobileNav data={categories} />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <div className="ml-4 flex lg:ml-0 gap-x-2 ">
           <LogoComponent />
          </div>
        </Link>
        <MainNav data={categories} />
        <NavbarActions />
      </header>
    </div>
  );
};

export default Navbar;
