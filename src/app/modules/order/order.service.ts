import httpStatus from 'http-status';
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { orderUtils } from './order.utils';
import { User } from '../user/user.model';

const createOrderIntoDB = async (
  orderData: TOrder,
  user: any,
  client_ip: string,
) => {
  const product = await Product.findById(orderData.product);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found');
  }

  if (product.quantity < orderData.quantity) {
    return {
      status: false,
      message: `Insufficient stock. Only ${product.quantity} units available.`,
    };
  }

  if (orderData.totalPrice !== product?.price * orderData.quantity) {
    return {
      status: false,
      message: `Total price must be Quantity * product Price Per Unit`,
    };
  }

  // Create order
  let newOrder = await Order.create({ ...orderData, userId: user.id });

  // Update product quantity
  product.quantity -= orderData.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  // payment integration
  const shurjopayPayPaymentInfo = {
    amount: orderData.totalPrice,
    order_id: newOrder._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: orderData.address,
    customer_email: user.email,
    customer_phone: orderData.phone,
    customer_city: user.city || 'Dhaka',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayPaymentInfo);

  if (payment?.transactionStatus) {
    newOrder = await newOrder.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

// This function calculates the total revenue from all orders in the database
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
    throw new Error(error.message || 'Failed to calculate revenue');
  }
};

const getOrderByCustomer = async (id: string) => {
  const isCustomerExist = await User.findById(id);
  if (!isCustomerExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
  }
  const result = await Order.find({ userId: id }).populate({
    path: 'product',
    model: Product,
  });

  // If no orders found, return an appropriate message
  if (result.length === 0) {
    return {
      message: 'No orders found for this customer.',
      data: [],
    };
  }
  
  return {
    data: result,
  };
};

const getAllOrders = async () => {
  const data = await Order.find().populate({
    path: 'product',
    model: Product,
  });
  return data;
};

const updateOrderStatus = async (payload: {
  id: string;
  shippingStatus?: string;
  paymentStatus?: string;
}) => {
  const updateFields: any = {};

  if (payload.shippingStatus) {
    updateFields.shippingStatus = payload.shippingStatus;
  }

  if (payload.paymentStatus) {
    updateFields.paymentStatus = payload.paymentStatus;
  }

  const result = await Order.findByIdAndUpdate(payload.id, updateFields, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found or update failed!');
  }

  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.deleteOne({ _id: id }, { isDeleted: true });
  return result;
}

export const OrderService = {
  createOrderIntoDB,
  verifyPayment,
  getAllOrders,
  calculateRevenue,
  updateOrderStatus,
  getOrderByCustomer,
  deleteOrderFromDB
};
