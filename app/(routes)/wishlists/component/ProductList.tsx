import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";

import { Separator } from "@/components/ui/separator";
import WishListProducts from "./Wishlists";

interface ProductListProps {
  wishlist: Product[];
  showBadge?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  wishlist,
  showBadge = false,
}) => {
  return (
    <div className="space-y-10">
    
      {wishlist.length === 0 && <NoResult />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-10 mx-4">
        {wishlist.map((item) => (
          <WishListProducts key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
