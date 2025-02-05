import db from "@/utils/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

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
      direction === "asc" || direction === "desc" ? direction : "asc";

    orderBy.push({
      [field === "name" ? "product_name" : "price"]: validDirection,
    });
  }

  const whereClause: Prisma.ProductWhereInput = {};
  if (category) {
    whereClause.category = category;
  }

  const products = await db.product.findMany({
    where: whereClause,
    orderBy: orderBy.length > 0 ? orderBy : { product_name: "asc" }, // Only include orderBy if it's not empty
  });

  return products;
};

export const fetchProductById = async (id: string) => {
  const productId = parseInt(id);
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      options: { include: { sizes: true } },
    },
  });
  return product ? product : redirect("/products");
};
