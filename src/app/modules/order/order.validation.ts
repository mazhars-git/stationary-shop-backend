import { z } from 'zod';
import { Types } from 'mongoose';

// Custom Zod validation for MongoDB ObjectId
const objectIdValidation = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

// Zod schema for Order validation
const orderValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  product: objectIdValidation,
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .positive('Quantity must be at least 1'),
  totalPrice: z
    .number()
    .nonnegative('Total price must be a non-negative number'),
});

export default orderValidationSchema;
