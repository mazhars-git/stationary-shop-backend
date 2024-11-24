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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Error creating the order");
  }
};

const calculateRevenue = async () => {
    try {
      const result = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
          },
        },
      ]);
  
      // Return totalRevenue or default to 0 if no orders are found
      return result.length > 0 ? result[0].totalRevenue : 0;
    } catch (error: any) {
      throw new Error(error.message || "Failed to calculate revenue");
    }
  };

export const OrderService = {
  createOrderInDB,
  calculateRevenue
};
