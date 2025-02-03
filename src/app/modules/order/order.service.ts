import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDB = async (order: TOrder) => {
  try {
    let totalPrice = 0;

    // Validate all products
    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Invalid product ID: ${item.product}`);
      }

      // Check stock availability
      if (product.quantity < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Only ${product.quantity} units available.`
        );
      }

      // Calculate total price
      totalPrice += product.price * item.quantity;

      // Update inventory
      product.quantity -= item.quantity;
      product.inStock = product.quantity > 0;
      await product.save();
    }

    // Create order
    const newOrder = await Order.create({ ...order, totalPrice });

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Failed to calculate revenue");
    }
  };

  // const verifyPaymentStatus = async (orderId: string) => {
  //   try {
  //     // Simulate async call to a payment gateway to verify payment
  //     const paymentDetails = await paymentGateway.getPaymentStatus(orderId);
  
  //     if (paymentDetails) {
  //       // Update the order with the transaction details from the payment gateway
  //       const updatedOrder = await Order.findOneAndUpdate(
  //         { 'transaction.id': orderId }, // Find the order using the transaction ID
  //         {
  //           'transaction.bank_status': paymentDetails.bank_status, // Payment status
  //           'transaction.sp_code': paymentDetails.sp_code, // Gateway response code
  //           'transaction.sp_message': paymentDetails.sp_message, // Message
  //           'transaction.transactionStatus': paymentDetails.transaction_status, // Transaction status
  //           'transaction.method': paymentDetails.method, // Payment method (e.g., Credit Card, PayPal)
  //           'transaction.date_time': paymentDetails.date_time, // Timestamp
  //           status: determineOrderStatus(paymentDetails.bank_status), // Set order status based on payment result
  //         },
  //         { new: true } // Return the updated order
  //       );
  
  //       return updatedOrder; // Return updated order after payment status update
  //     }
  
  //     throw new Error("Payment verification failed"); // Handle case where payment details are not found
  //   } catch (error) {
  //     throw new Error(`Error during payment verification: ${error.message}`);
  //   }
  // };
  
  // Helper function to determine order status based on payment result
  // const determineOrderStatus = (bankStatus: string): string => {
  //   switch (bankStatus) {
  //     case 'Success':
  //       return 'Paid';
  //     case 'Failed':
  //       return 'Pending';
  //     case 'Cancelled':
  //       return 'Cancelled';
  //     default:
  //       return 'Unknown'; // Default case for unknown payment status
  //   }
  // };

export const OrderService = {
  createOrderInDB,
  calculateRevenue
};
