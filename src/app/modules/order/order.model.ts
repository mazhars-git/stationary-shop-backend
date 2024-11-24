import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";


const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, 
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Order model
export const Order = model<TOrder>("Order", orderSchema);
