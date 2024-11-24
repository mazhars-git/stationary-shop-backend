import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/api/orders", OrderController.createOrder);

export const OrderRoutes = router;
