import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDB = async (order: TOrder) => {
  try {
    const product = await Product.findById(order.product);
    if (!product) {
      throw new Error("Invalid product ID");
    }

    // Check if stock is available
    if (product.quantity < order.quantity) {
      throw new Error(
        `Insufficient stock. Only ${product.quantity} units are available.`
      );
    }

    // Create the order
    const totalPrice = product.price * order.quantity;
    const newOrder = await Order.create({ ...order, totalPrice });

    // Update inventory
    product.quantity -= order.quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    return newOrder;
  } catch (error: any) {
    throw new Error(error.message || "Error creating the order");
  }
};

export const OrderService = {
  createOrderInDB,
};
