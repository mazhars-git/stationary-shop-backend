# Stationery Products API

##### This is a Node.js and Express-based REST API for managing stationery products and orders. The API supports CRUD operations for products, inventory management, and order processing, including revenue calculation.

## Features
1. Product Management

    * Create, update, delete, and fetch products.
    * Inventory tracking for products, including stock availability.

2. Order Management

    * Place orders and update product inventory accordingly.
    * Calculate total revenue from all orders using MongoDB aggregation.

3. Dynamic Filtering

    * Search for products by name, brand, or category.

4. Validation

    * Uses zod for request validation to ensure data consistency.


## Technologies Used

    * Node.js: JavaScript runtime for building the backend.
    * Express.js: Web framework for creating REST APIs.
    * MongoDB: NoSQL database for data storage.
    * Mongoose: ODM for MongoDB schema and queries.
    * TypeScript: Typed superset of JavaScript for better development experience.
    * Zod: Schema-based validation library for request data validation.


## Installation

1. Clone the repository:

bash
``` git clone https://github.com/Mahmudul107/stationary-shop ```
```cd stationery-api```

2. Install dependencies:

bash
```npm install```

3. Create a .env file in the root directory and add the following environment variables:

env
```PORT=5000```
```MONGO_URI=mongodb://localhost:27017/stationery```

4. Start the development server:

bash
```npm run dev```

5. Access the API at http://localhost:5000.


## Endpoints

### Product Management
Create a Product
    * Endpoint: /api/products
    * Method: POST
    * Request Body:

{
  "name": "Pen",
  "brand": "Pilot",
  "price": 2.5,
  "category": "Writing",
  "description": "A smooth writing pen",
  "quantity": 100,
  "inStock": true
}

* Response:

{
  "success": true,
  "message": "Product created successfully",
  "data": { ...product details... }
}

### Get All Products

    * Endpoint: /api/products
    * Method: GET
    * Query Parameters:
        *searchTerm (optional): Filter products by name, brand, or category.
    * Response
{
  "name": "Updated Pen",
  "quantity": 50
}

* Response:

{
  "success": true,
  "message": "Product updated successfully",
  "data": { ...updated product details... }
}

### Order Management
Place an Order
    * Endpoint: /api/orders
    * Method: POST
    * Request Body:
{
  "email": "customer@example.com",
  "product": "product_id_here",
  "quantity": 2
}

* Response:

{
  "success": true,
  "message": "Order placed successfully",
  "data": { ...order details... }
}

### Calculate Revenue
    * Endpoint: /api/orders/revenue
    * Method: GET
    * Response:

{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720
    }
}

## Project Structure
stationery-api/

├── src/
│   ├── products/
│   │   ├── product.interface.ts   # Product TypeScript interface
│   │   ├── product.model.ts       # Product schema and model
│   │   ├── product.controller.ts  # Product controllers
│   │   ├── product.routes.ts      # Product routes
│   │   ├── product.validation.ts  # Product validation schema
│   ├── orders/
│   │   ├── order.interface.ts     # Order TypeScript interface
│   │   ├── order.model.ts         # Order schema and model
│   │   ├── order.controller.ts    # Order controllers
│   │   ├── order.routes.ts        # Order routes
│   │   ├── order.validation.ts    # Order validation schema
│   ├── app.ts                     # Express app initialization
│   ├── server.ts                  # Server entry point
├── package.json
├── tsconfig.json
├── .env

## Scripts
    * npm run dev: Start the development server with hot-reloading.
    * npm run build: Compile TypeScript into JavaScript.
    * npm start: Start the production server.

## Future Improvements
    * Add user authentication and authorization.
    * Implement pagination for product and order listings.
    * Improve error handling and logging.
    * Add unit and integration tests.

## Contributors

    * Your Name – Mahmudul Islam
#### Feel free to open an issue or create a pull request for suggestions or improvements!
