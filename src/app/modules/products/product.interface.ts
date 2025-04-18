import { Model } from 'mongoose';

export type TProductCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

// Define the product type
export type TProduct = {
  name: string;
  brand: string;
  model: string;
  price: number;
  productImg: string;
  category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};

// Define the Mongoose Model Type
export type TProductModel = Model<TProduct, Record<string, unknown>>;
