import { Metadata } from 'next';
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-size";
import getColors from "@/actions/get-colors";
import Container from "@/components/ui/container/container";
import Filter from "@/components/Filter";
import MobileFilter from "@/components/MobileFilter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Product, Size, Color } from "@/types";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Featured Products",
    description: "Browse our collection of featured products.",
  };
}

const FeaturedProducts = async () => {
  const products = await getProducts({ isNew: true });
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
          {/* Mobile Filter */}
          <MobileFilter sizes={sizes} colors={colors} />

          {/* Desktop Filter */}
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>

          {/* Product List */}
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 ? (
              <NoResult />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedProducts;