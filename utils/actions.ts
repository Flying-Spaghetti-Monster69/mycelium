import db from "@/utils/db";
import { Prisma } from "@prisma/client";

export const fetchProducts = async ({
  category,
  order,
}: {
  category: string | undefined;
  order: string;
}) => {
  const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
  const [field, direction] = order.split("-");

  if (field === "name" || field === "price") {
    const validDirection =
      direction === "asc" || direction === "desc" ? direction : "asc"; // Default to 'asc' if direction is invalid

    orderBy.push({
      [field === "name" ? "product_name" : "price"]: validDirection,
    });
  }

  const products = await db.product.findMany({
    where: {
      category: category,
    },
    orderBy: orderBy.length > 0 ? orderBy : { product_name: "asc" }, // Only include orderBy if it's not empty
  });

  return products;
};

export const fetchProductById = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};
