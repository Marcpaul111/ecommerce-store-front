import { Metadata } from 'next'
import getCategory from "@/actions/get-category"
import getColors from "@/actions/get-colors"
import getProducts from "@/actions/get-products"
import getSizes from "@/actions/get-size"
import Banner from "@/components/Banner"
import Container from "@/components/ui/container/container"
import Filter from "../../../../components/Filter"
import NoResult from "@/components/ui/no-result"
import ProductCard from "@/components/ui/product-card"
import MobileFilter from "../../../../components/MobileFilter"

export const revalidate = 0

interface CategoryProps {
  params: Promise<{ categoryId: string }>
  searchParams: Promise<{ colorId?: string; sizeId?: string }>
}

export async function generateMetadata(
  { params, searchParams }: CategoryProps
): Promise<Metadata> {
  const { categoryId } = await params
  const category = await getCategory(categoryId)

  return {
    title: category.name,
    description: `Browse our ${category.name} collection`,
  }
}

export default async function Category({ params, searchParams }: CategoryProps) {
  const { categoryId } = await params
  const { colorId, sizeId } = await searchParams

  const productsPromise = getProducts({
    categoryId,
    colorId,
    sizeId,
  })

  const sizesPromise = getSizes()
  const colorsPromise = getColors()
  const categoryPromise = getCategory(categoryId)

  const [products, sizes, colors, category] = await Promise.all([
    productsPromise,
    sizesPromise,
    colorsPromise,
    categoryPromise
  ])

  return (
    <div className="bg-white">
      <Container>
        <Banner data={category.banner} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResult />}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}