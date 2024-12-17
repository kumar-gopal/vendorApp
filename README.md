# vandorApp [Multi-Tenant E-Commerce API]

This project is a backend API for a multi-tenant e-commerce system built using **Node.js**, **Express.js**, and **MongoDB**. It allows vendors to register, manage products, and handle orders securely.

## Features

### 1. **Vendor Management**
- Vendors can register and log in.
- JWT-based authentication for secure access.
- Vendors can manage only their own products and orders.

#### Vendor Schema:
- `name` (String)
- `email` (String, unique)
- `password` (Hashed)
- `createdAt` (Date, default: current timestamp)

### 2. **Product Management**
- Vendors can add, update, delete, and list their products.
- Pagination implemented for product listing.

#### Product Schema:
- `name` (String)
- `price` (Number)
- `stock` (Number)
- `vendor` (Reference to Vendor)
- `createdAt` (Date, default: current timestamp)

### 3. **Order Management**
- Vendors can view orders placed for their products.
- A route to mark orders as shipped.

#### Order Schema:
- `product` (Reference to Product)
- `quantity` (Number)
- `status` (Enum: ["pending", "shipped"], default: pending)
- `createdAt` (Date, default: current timestamp)

## API Endpoints

### Authentication
1. `POST /api/vendors/register` - Vendor registration.
2. `POST /api/vendors/login` - Vendor login.

### Product Management
3. `POST /api/products` - Add a new product.
4. `GET /api/products` - List all products (pagination supported: `?page=1&limit=10`).
5. `PUT /api/products/:id` - Update product details.
6. `DELETE /api/products/:id` - Delete a product.

### Order Management
7. `GET /api/orders` - List all orders for the vendor’s products.
8. `PUT /api/orders/:id` - Mark an order as shipped.

## Security Requirements
- All routes are protected with JWT authentication.
- Vendors can only access their own data (e.g., they cannot modify another vendor’s products or view their orders).

## Validation and Optimization
- **Data Validation**: All incoming data is validated using `Joi` or `express-validator`.
- **Database Optimization**: MongoDB indexes are used to optimize product searches and queries.
- **Error Handling**: Errors are handled gracefully, returning appropriate HTTP status codes.
- **Rate Limiting**: The server is protected from excessive requests using `express-rate-limit` to prevent potential downtime.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=3000
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your Secret Key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage
- Use tools like **Postman** or **cURL** to test the API endpoints.
- Ensure you provide the JWT token in the `Authorization` header for protected routes.

## Dependencies
- `express`
- `mongoose`
- `jsonwebtoken`
- `bcrypt`
- `joi` or `express-validator`
- `dotenv`
- `express-rate-limit`

## License
This project is licensed under the MIT License. Feel free to use and modify it for your needs.

## Contribution
Contributions are welcome! If you find any issues or have suggestions, please create a pull request or open an issue.
