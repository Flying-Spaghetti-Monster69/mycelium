import { fetchProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";
import OrderSelect from "./OrderSelect";
import { Suspense } from "react";

export default async function ProductGrid({
  order,
  category,
}: {
  order: string;
  category?: string;
}) {
  const products = await fetchProducts({ order, category });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-black">{products.length} products</p>
        <OrderSelect order={order} category={category} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
