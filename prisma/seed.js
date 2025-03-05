/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client");
const products = require("./products.json");

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        price: product.price,
        image_url: product.image_url,
        clerkId: product.clerkId,
        cartItems: {
          create: [],
        },
        options: {
          create: product.options.map((option) => ({
            color_name: option.color_name,
            color_hex: option.color_hex,
            sizes: {
              create: option.sizes.map((size) => ({
                size: size.size,
                quantity: size.quantity,
              })),
            },
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seed completed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
