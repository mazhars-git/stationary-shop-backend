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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
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
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
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
  },
  {
    timestamps: true,
  }
);


// Create the Order model
export const Order = model<TOrder>("Order", orderSchema);