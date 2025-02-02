import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99, image: "/placeholder.svg" },
  { id: 2, name: "Slim Fit Jeans", price: 49.99, image: "/placeholder.svg" },
  { id: 3, name: "Summer Dress", price: 39.99, image: "/placeholder.svg" },
  { id: 4, name: "Leather Jacket", price: 99.99, image: "/placeholder.svg" },
  { id: 5, name: "Polo Shirt", price: 29.99, image: "/placeholder.svg" },
  { id: 6, name: "Denim Shorts", price: 34.99, image: "/placeholder.svg" },
];

export default function ProductGrid() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-black">{products.length} products</p>
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="name-a-z">Name: A to Z</SelectItem>
            <SelectItem value="name-z-a">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
