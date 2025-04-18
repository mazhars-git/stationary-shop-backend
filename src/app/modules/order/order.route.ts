import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/api/order/create-order',
  auth(USER_ROLE.user, USER_ROLE.admin),
  OrderController.createOrder,
);
router.get(
  '/api/orders/revenue',
  auth(USER_ROLE.admin),
  OrderController.calculateRevenue,
);
router.get(
  '/api/orders/verify',
  auth(USER_ROLE.user, USER_ROLE.admin),
  OrderController.verifyPayment,
);
router.get('/api/orders/:id', OrderController.getOrderByCustomer);
router.get('/api/orders', auth(USER_ROLE.admin), OrderController.getAllOrders);

router.patch(
  '/api/orders/update-order-status',
  auth(USER_ROLE.admin),
  OrderController.updateOrderStatus,
);

router.delete(
  '/api/orders/delete-single-order/:id',
  auth(USER_ROLE.admin),
  OrderController.deleteOrder,
);

export const OrderRoutes = router;
