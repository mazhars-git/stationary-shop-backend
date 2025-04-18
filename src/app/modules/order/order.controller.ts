import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import { TOrder } from './order.interface';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const orderData: TOrder = req.body;
  const result = await OrderService.createOrderIntoDB(orderData, user, req.ip!);
  res.json({
    success: true,
    statusCode: httpStatus.CREATED,
    message:
      typeof result === 'object' && 'message' in result
        ? result.message
        : 'Order placed successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string);

  res.json({
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});

const calculateRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalRevenue = await OrderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const getOrderByCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.getOrderByCustomer(id);
  sendResponse(res, {
      success: true,
      message: 'Orders Retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result.data,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
      success: true,
      message: 'Orders Retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await OrderService.updateOrderStatus(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order status updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderFromDB(id);
  sendResponse(res, {
      success: true,
      message: 'Order Deleted Successfully',
      statusCode: httpStatus.OK,
      data: result,
  });
})

export const OrderController = {
  createOrder,
  verifyPayment,
  calculateRevenue,
  getOrderByCustomer,
  updateOrderStatus,
  getAllOrders,
  deleteOrder
};
