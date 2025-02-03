import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { Separator } from "@/components/ui/separator";

async function ProductsPage(
  props: {
    searchParams: Promise<{ order?: string; category?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const order = searchParams.order || "name-asc";
  const category = searchParams.category || "hombres";
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:bg-white lg:rounded-md lg:h-fit lg:px-5 lg:py-4 lg:w-1/4">
          <FilterSidebar />
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="w-full lg:w-3/4">
          <ProductGrid order={order} category={category} />
        </div>
      </div>
    </div>
  );
}
export default ProductsPage;
