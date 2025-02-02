import { products } from "@/utils/mock";

function ProductsPage() {
  return (
    <div className="flex items-center flex-col gap-4">
      {products.map((product) => (
        <h1 key={product.id}>{product.product_name}</h1>
      ))}
    </div>
  );
}
export default ProductsPage;
