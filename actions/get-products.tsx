import { Product } from "@/types"
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  name?: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isNew: query.isNew,
      isFeatured: query.isFeatured,
    }
  })

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products: Product[] = await response.json();
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default getProducts;