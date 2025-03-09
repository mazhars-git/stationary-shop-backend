import { Request, Response } from 'express';
import { ProductServices } from './product.service';
// import { productValidationSchema } from './product.validation';
import { Product } from './product.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

// const createNewProduct = async (req: Request, res: Response) => {
//   try {
//     const product = req.body;
//     const image = req.file
//     console.log('Received data:', req.body);
// console.log('Received file:', req.file);
//     // console.log(product);
//     // const zodParsedData = productValidationSchema.parse(product);

//     const result = await ProductServices.createNewProductIntoDB(image, product); 

//     res.status(200).json({
//       success: true,
//       message: 'Product created successfully',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

const createNewProduct = async (req: Request, res: Response) => {
  try {
    if(req.file){
      const imageName = 'stationary.product'
      const path = req.file.path
      const {secure_url} = await sendImageToCloudinary(imageName, path)
      req.body.productImg = secure_url
      console.log(secure_url);
    }
    // const zodParsedData = productValidationSchema.parse(product);

    const result = await ProductServices.createNewProductIntoDB(req.body); 

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProducts = async (req: Request, res: Response):Promise<any> => {
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
        message: "Failed to fetch products",
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
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleProduct = async (req: Request, res: Response):Promise<any> => {
    const { productId } = req.params; 
    const productData = req.body;
  
    try {
      const updatedProduct = await ProductServices.updateSingleProductFromDB(productId, productData);
  
      if (!updatedProduct) {
        // If no product found, return 404
        return res.status(404).json({
          success: false,
          message: `Product with ID '${productId}' not found`,
        });
      }
  
      // Return the updated product
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteProduct = async (req: Request, res: Response):Promise<any> => {
    try {
      const product = await Product.findByIdAndDelete(req.params.productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
          data: null
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: {}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the product",
        data: null,
        error: error instanceof Error ? { message: error.message } : error,
      });
    }
  };
  

export const ProductController = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct
};
