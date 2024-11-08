import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Store, Twitter } from "lucide-react"
import getStoreBanners from "@/actions/get-store-banners"
import Image from "next/image"



  const Footer = async () => {

  const {desktopBanners} = await getStoreBanners();

  const logoUrl = desktopBanners[0]?.logoUrl || null; 
  const storeName = desktopBanners[0]?.name || undefined;
  const twitterUrl = desktopBanners[0]?.twitterUrl || undefined;
  const instagramUrl = desktopBanners[0]?.instagramUrl || undefined;
  const facebookUrl = desktopBanners[0]?.facebookUrl || undefined;

  const LogoComponent = () => {
    if (logoUrl) {
      return (
        <Image 
          src={logoUrl} 
          width={60} 
          height={60} 
          alt="Store logo"
          className="h-12 w-auto object-contain"
          priority
        />
      );
    }
    return <Store className="h-8 w-8" />;
  };


  // console.log(storeData);
  
  return (
    <footer className="bg-[#3d3e51] text-white py-12 px-4 sm:px-6 lg:px-8 z-30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
           <LogoComponent />
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Bestsellers</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Sale</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Collections</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Press</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Care</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <p className="text-sm">Subscribe to our newsletter for exclusive offers and updates.</p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit" variant="secondary">Subscribe</Button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href={facebookUrl} className="text-white hover:text-gray-900 transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href={instagramUrl} className="text-white hover:text-gray-900 transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href={twitterUrl} className="text-white hover:text-gray-900 transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm">
        <p>&copy; 2024 {storeName}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;



 