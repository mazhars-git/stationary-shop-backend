import { Schema, model } from "mongoose";
import { TProduct, TProductModel } from "./product.interface";

// Define product categories as an array of string literals
const productCategories = [
  "Writing",
  "Office Supplies",
  "Art Supplies",
  "Educational",
  "Technology",
] as const;

// Schema for TProduct
const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: productCategories, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


// Query middleware
productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

productSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

// Query middleware/hook for preventing to get deleted data: aggregate
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create and export the Mongoose model
export const Product = model<TProduct, TProductModel>("Product", productSchema);
