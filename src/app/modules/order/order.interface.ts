import mongoose from 'mongoose';

export type TOrder = {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  userId?: string;
  address: string;
  phone: string;
  paymentStatus: 'Pending' | 'Paid' | 'Shipped' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  shippingStatus?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
};
