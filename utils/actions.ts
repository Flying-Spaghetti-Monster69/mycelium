/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart, Prisma } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

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

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    // Parse options if it's a string
    if (typeof rawData.options === "string") {
      try {
        rawData.options = JSON.parse(rawData.options);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error("Invalid options format");
      }
    }
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);
    const { options, ...productFields } = validatedFields;
    await db.product.create({
      data: {
        ...productFields,
        image_url: fullPath,
        clerkId: user.id,
        options: {
          create: options.map((option) => ({
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
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      product_name: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: number }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image_url);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: number) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      options: {
        include: {
          sizes: true,
        },
      },
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    let productId: string | number = formData.get("id") as string;
    productId = parseInt(productId);
    const rawData = Object.fromEntries(formData);
    // Parse options if it's a string
    if (typeof rawData.options === "string") {
      try {
        rawData.options = JSON.parse(rawData.options);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error("Invalid options format");
      }
    }
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const { options, ...productFields } = validatedFields;
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...productFields,
        options: {
          deleteMany: {},
          create: options.map((option) => ({
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
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    let productId: string | number = formData.get("id") as string;
    productId = parseInt(productId);
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image_url: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: number) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productOptionId,
  cartId,
  amount,
}: {
  productId: number;
  cartId: number;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productOptionId,
      cartId,
    },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productOptionId, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });
  return { cartItems, currentCart };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    let productOptionId: string | number = formData.get(
      "productSizeId"
    ) as string;
    productOptionId = parseInt(productOptionId);
    const amount = Number(formData.get("amount"));
    await fetchProduct(productOptionId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productOptionId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    let cartItemId: string | number = formData.get("id") as string;
    cartItemId = parseInt(cartItemId);
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: number;
}) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return renderError(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | number = null;
  let cartId: null | number = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
