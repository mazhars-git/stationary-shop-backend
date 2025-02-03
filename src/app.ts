import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
import notFoundRoute from './app/middleware/notFoundRoute';
import { UserRoutes } from './app/modules/user/user.route';
import authRouter from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", ProductRoutes);
app.use("/", OrderRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Stationary Shop is running on..');
});

app.use(globalErrorHandler);

// Not found routes
app.use(notFoundRoute);

export default app;
