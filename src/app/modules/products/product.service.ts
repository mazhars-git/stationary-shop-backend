import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createNewProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  // console.log(result);
  return result;
};

// Retrieve All Products
const getAllProductService = async (searchTerm: Record<string, unknown>) => {
  const allProductQuery = new QueryBuilder(Product.find(), searchTerm)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await allProductQuery.modelQuery;
  const meta = await allProductQuery.countTotal();

  return { result, meta };
};

// Retrieve a specific Product
const retrieveSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// Update Product
const updateSingleProductFromDB = async (id: string, productData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
};

// Delete a Product from DB
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createNewProductIntoDB,
  getAllProductService,
  retrieveSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
};
