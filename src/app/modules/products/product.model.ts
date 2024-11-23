import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

// Schema for TProduct
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], 
    required: true 
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Create and export the Mongoose model
export const Product = model<TProduct>("Product", productSchema);