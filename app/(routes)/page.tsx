import getBanners from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/Banner";
import ProductLists from "@/components/ProductLists";
import Container from "@/components/ui/container/container";
import React from "react";

import ImageSlider from "@/components/galleryCarousel";
import getStoreBanners from "@/actions/get-store-banners";
import Link from "next/link";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const newProducts = await getProducts({ isNew: true });
  // const banner = await getBanners("2dd90fc1-84f8-4fb6-881d-312b543bccec");

  const storeBanners = await getStoreBanners();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <ImageSlider images={storeBanners} />

        {/* <Banner data={banner} /> */}

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mt-12">
          <ProductLists
            items={products}
            title="Featured Products"
            limit={8}
            href="/featured"
          />
        </div>

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mt-12">
          <ProductLists
            items={newProducts}
            title="New Arrivals"
            showBadge={true}
            limit={8}
            href="/new"
          />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
