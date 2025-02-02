"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
const OrderSelect = ({
  order,
  category,
}: {
  order: string;
  category?: string;
}) => {
  const router = useRouter();
  const handleDynamicRoute = (value: string) => {
    router.push(`/products?category=${category}&order=${value}`); // Navigate to /products/123 (for example)
  };
  return (
    <Select
      onValueChange={(value) => {
        handleDynamicRoute(value);
      }}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder={order ? order : "Sort by"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="name-asc">Name: A to Z</SelectItem>
        <SelectItem value="name-desc">Name: Z to A</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderSelect;
