import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  brand: z.string().nonempty("Brand is required"),
  model: z.enum([
    "G2",
    "V7 Hi-Tecpoint",
    "Precise V5 RT",
    "Jotter",
    "IM",
    "Vector"
  ], { message: "Invalid model" }),
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
  isDeleted: z.boolean().default(false),
});
