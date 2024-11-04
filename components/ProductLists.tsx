import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Separator } from "./ui/separator";
import Link from "next/link";

interface ProductListsProps {
  title: string;
  items: Product[];
  showBadge?: boolean;
  limit?: number;
  href?: string;
}

const ProductLists: React.FC<ProductListsProps> = ({
  title,
  items,
  showBadge = false,
  limit,
  href
}) => {
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-10 my-12">
      <div className="relative flex items-center justify-center">
        <Separator className="absolute top-1/2 w-full transform -translate-y-1/2 text-lg bg-gray-900" />
        <h3 className="relative z-10 font-bold text-3xl bg-white text-center px-10">
          {title}
        </h3>
      </div>

      {items.length === 0 && <NoResult />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {displayedItems.map((item) => (
          <ProductCard key={item.id} data={item} showBadge={showBadge} />
        ))}
      </div>
      {limit && href && (
        <div className="flex justify-center items-center my-12">
          <Link href={href}>
            <h2 className="text-lg font-medium underline hover:font-bold">
              See All
            </h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductLists;
