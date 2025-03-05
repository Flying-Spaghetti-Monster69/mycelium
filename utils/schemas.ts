import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  category: z.enum(["hombres", "mujeres", "cosas"], {
    required_error: "Category is required",
    invalid_type_error: "Category must be 'hombres', 'mujeres', or 'cosas'",
  }),
  options: z
    .array(
      z.object({
        color_name: z.string(),
        color_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          message: "Invalid hex color format",
        }),
        sizes: z.array(
          z.object({
            size: z.string(),
            quantity: z.number().int().min(0, {
              message: "Quantity must be a positive number",
            }),
          })
        ),
      })
    )
    .min(1, {
      message: "At least one color option is required",
    }),
});
export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}
