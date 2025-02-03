import { z } from "zod";
import { Types } from "mongoose";

// Custom Zod validation for MongoDB ObjectId
const objectIdValidation = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Zod schema for Order validation
const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  user: objectIdValidation, // Validate the user ObjectId
  products: z.array(
    z.object({
      product: objectIdValidation, // Each product must have a valid ObjectId
      quantity: z.number().int().positive("Quantity must be at least 1"),
    })
  ).nonempty("At least one product is required"),
  totalPrice: z.number().nonnegative("Total price must be a non-negative number"),
  status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"]).default("Pending"),
  transaction: z.object({
    id: z.string().optional(),
    transactionStatus: z.string().optional(),
    bank_status: z.string().optional(),
    sp_code: z.string().optional(),
    sp_message: z.string().optional(),
    method: z.string().optional(),
    date_time: z.string().optional(),
  }).optional(),
});

export default orderValidationSchema;
