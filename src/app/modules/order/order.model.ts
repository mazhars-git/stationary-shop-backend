import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product is Required'],
      ref: 'Product',
  },
  quantity: {
      type: Number,
      required: [true, 'Quantity is Required'],
      min: [1, 'Quantity must be at least 1'],
  },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: [true, 'Address is Required'],
  },
  phone: {
      type: String,
      required: [true, 'Phone is Required'],
  },
  paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: { type: String, default: "" },
      transactionStatus: { type: String, default: "" },
      bank_status: { type: String, default: "" },
      sp_code: { type: String, default: "" },
      sp_message: { type: String, default: "" },
      method: { type: String, default: "" },
      date_time: { type: String, default: "" },
    },
    shippingStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
  },
  },
  {
    timestamps: true,
  }
);


// Create the Order model
export const Order = model<TOrder>("Order", orderSchema);