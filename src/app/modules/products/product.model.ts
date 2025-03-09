import { Schema, model } from 'mongoose';
import { TProduct, TProductModel } from './product.interface';

const productCategories = [
  'Writing',
  'Office Supplies',
  'Art Supplies',
  'Educational',
  'Technology',
] as const;
// Schema for TProduct
const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    model: {
      type: String,
      required: true,
    },
    price: { type: Number },
    productImg: { type: String, required: [true, 'Image is required'] },
    category: {
      type: String,
      enum: productCategories,
      required: [true, 'Category is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query middleware
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

productSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

// Query middleware/hook for preventing to get deleted data: aggregate
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create and export the Mongoose model
export const Product = model<TProduct, TProductModel>('Product', productSchema);
