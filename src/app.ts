import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
import notFoundRoute from './app/middleware/notFoundRoute';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", ProductRoutes);
app.use("/", OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Stationary Shop is running on..');
});

// Not found routes
app.use(notFoundRoute);

export default app;
