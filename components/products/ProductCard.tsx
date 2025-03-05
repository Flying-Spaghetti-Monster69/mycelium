import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Product {
  id: number;
  product_name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.image_url || "/images/default.jpg"}
            alt={product.product_name}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2">New</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 h-max">
        <h3 className="font-semibold text-lg mb-2">{product.product_name}</h3>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <Link
          className="w-full mb-2 mt-auto"
          href={`/products/${product.id}`}
          passHref
        >
          <Button className="w-full" variant="outline">
            View
          </Button>
        </Link>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
