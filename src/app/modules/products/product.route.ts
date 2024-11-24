import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// Create a new product
router.post('/api/products', ProductController.createNewProduct)

export const ProductRoutes = router;