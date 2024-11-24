import { z } from "zod";

// Define the Zod schema for TProduct
export const productValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  brand: z.string().nonempty("Brand is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.enum([
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
  ]),
  description: z.string().nonempty("Description is required"),
  quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  inStock: z.boolean(),
  isDeleted: z.boolean().default(false)
});
