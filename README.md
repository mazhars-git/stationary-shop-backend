# Stationary Shop Backend

## Live Link

- [Stationary Shop Backend](https://stationary-backend-teal.vercel.app/)

## Overview

Stationary Shop is a comprehensive backend system designed for an online stationery shop. It allows users to browse products, place orders, and manage their profile. The admin has the ability to manage products, users, and orders.

## Features

- **User Authentication:** User registration and login with JWT token-based authentication.
- **Product Management:** CRUD operations for adding, updating, and deleting stationery products.
- **Order Management:** Users can place orders, and the admin can manage order statuses.
- **Payment Integration:** Supports verifying payments through Surjopay API.
- **Roles:** Admin and User roles with access control for various endpoints.
- **Product Search and Filters:** Provides advanced search options with filters and pagination.
- **Stock Management:** Real-time stock updates upon order placement.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** Surjopay
- **Validation:** Zod
- **Error Handling:** Custom AppError Class
- **Request Handling:** Middleware, Async Error Handling

## Endpoints

- **POST `/api/users/register`** - User registration.
- **POST `/api/users/login`** - User login (returns a JWT token).
- **GET `/api/products`** - Get all products.
- **GET `/api/products/:id`** - Get a specific product by ID.
- **POST `/api/orders`** - Place an order.
- **POST `/api/payment/verify`** - Verify payment with Surjopay.
- **GET `/api/orders`** - Get all orders (admin only).
- **GET `/api/users`** - Get all users (admin only).

## Setup

### Prerequisites

- Node.js >= 16.0
- MongoDB (local or cloud)
- A Surjopay account for payment integration

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mahmudul107/stationary-shop.git

   ```

2. Navigate into the project directory:
   `cd stationary-shop`

3. Install dependencies:
   npm install

4. Create a .env file in the root directory and add the following environment variables:
   NODE_ENV=
   PORT=
   DATABASE_URL=
   BYCRYPT_SALT_Round=
   JWT_ACCESS_SECRET=
   JWT_ACCESS_EXPIRES_IN=

5. Run the app:
    ```npm run dev```

### API Documentation
For detailed API usage, refer to the API documentation section or review the Postman collections (if available).

## Contact
[Github](https://github.com/Mahmudul107)