import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;

    const result = await OrderService.createOrderInDB(orderData);

    // Send a successful response
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const calculateRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalRevenue = await OrderService.calculateRevenue();
  
      res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: { totalRevenue },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  };

export const OrderController = {
  createOrder,
  calculateRevenue
};
