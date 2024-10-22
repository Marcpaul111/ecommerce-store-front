import getBanners from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/Banner";
import ProductLists from "@/components/ProductLists";
import Container from "@/components/ui/container/container";
import React from "react";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const banner = await getBanners("7f95771d-5c08-47b0-b7e1-b6e4ca1028ed");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Banner data={banner} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductLists items={products} title="Featured Products" />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
