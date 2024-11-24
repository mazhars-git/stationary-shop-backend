import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productValidationSchema } from './product.validation';

const createNewProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const zodParsedData = productValidationSchema.parse(product);
    
        const result = await ProductServices.createNewProductIntoDB(zodParsedData);
    
        res.status(200).json({
          success: true,
          message: 'Product created successfully',
          data: result,
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || 'something went wrong',
          error: err,
        });
      }
};

export const ProductController = {
  createNewProduct,
};
