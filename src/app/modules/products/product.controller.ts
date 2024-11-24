import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productValidationSchema } from './product.validation';
import { Product } from './product.model';

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

// Retrieve All Products
const getAllProducts = async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
  
    try {
      if (searchTerm) {
        // Create a case-insensitive regex for the search term
        const regex = new RegExp(searchTerm as string, "i");
  
        // Search in name, brand, or category fields
        const products = await Product.find({
          $or: [
            { name: regex },
            { brand: regex },
            { category: regex },
          ],
        });
  
        if (products.length === 0) {
          // If no products match the search term
          return res.status(404).json({
            success: false,
            message: `No products found matching '${searchTerm}'`,
          });
        }
  
        return res.status(200).json({
          success: true,
          message: `Products matching '${searchTerm}' retrieved successfully!`,
          data: products,
        });
      } else {
        // Fetch all products if no search term is provided
        const allProducts = await Product.find();
  
        return res.status(200).json({
          success: true,
          message: "Products retrieved successfully",
          data: allProducts,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Catch and handle any errors
      return res.status(500).json({
        success: false,
        message: "Failed to retrieved products",
        error: error.message,
      });
    }
  };
  

// Retrieve a single Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.retrieveSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  // updateProduct,
  // deleteProduct,
};
