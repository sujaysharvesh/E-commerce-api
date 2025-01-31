    E-commerce Backend API
This is a RESTful E-commerce Backend API built using Express.js, MongoDB, Redis, and JWT Authentication. It provides essential functionalities for an e-commerce platform, including user authentication, product management, order processing, and email notifications.

Features
User Authentication:

User registration and login with JWT (JSON Web Tokens).

Secure password hashing using bcrypt.

Role-based access control (e.g., admin, user).

Product Management:

Add, update, delete, and fetch products from shop model.

Search and filter products by category, price, and availability.

Order Processing:

Create, update

Manage order status (e.g., pending, shipped, delivered).

Email Notifications:

Send email notifications for order confirmation, status updates, and password reset using Nodemailer.

Caching with Redis:

Use Redis to cache frequently accessed data (e.g., product listings) for improved performance.

RESTful API:

Follows REST principles for clean and scalable API design.

Technologies Used
Backend Framework: Express.js

Database: MongoDB (with Mongoose for schema modeling)

Caching: Redis

Authentication: JSON Web Tokens (JWT)

Email Service: Nodemailer

API Testing: Postman

Version Control: Git

Setup Instructions
Prerequisites
Install Node.js (v16 or higher).

Install MongoDB and ensure it's running.

Install Redis and ensure it's running.

Install Git.

Installation
Clone the Repository:

bash
Copy
git clone https://github.com/sujaysharvesh/E-commerce-api
cd server
Install Dependencies:
bash
Copy
npm install
Set Up Environment Variables:
Create a .env file in the root directory and add the following variables:

env
Copy
PORT = 8000
MONGO_URL= -
JWT_TOKEN = -
JWT_LIFETIME = -
CLOUD_NAME = -
API_KEY = -
API_SECRET = -
PAYPAL_CLIENT_ID = -
PAYAPL_SECRET = -
REDIS_HOST = "localhost"
REDIS_POST = 6379
REDIS_LIFESPAN = 30 * 24 * 60 * 60
EMAIL_ID =-
EMAIL_PASSWORD = -
HOST = "localhost"
REDIS_URL =-

bash
Copy
npm start
Access the API:
The API will be running at http://localhost:3000.

API Endpoints
1. Authentication Routes
Base Path: /api/auth

Router: AuthRouter

Description: Handles user authentication (e.g., login, registration).

Example Endpoints:

POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in and receive a JWT token.

2. Admin Product Management Routes
Base Path: /api/admin/product

Router: AdminProductRouter

Middleware: AuthMiddleware, AdminMiddleware

Description: Allows admins to manage products (e.g., add, update, delete).

Example Endpoints:

POST /api/admin/product - Add a new product.

PUT /api/admin/product/:id - Update a product by ID.

DELETE /api/admin/product/:id - Delete a product by ID.

GET /api/admin/product - Fetch all products.

3. Admin Order Management Routes
Base Path: /api/admin/order

Router: OrderRouter

Middleware: AuthMiddleware, AdminMiddleware

Description: Allows admins to manage orders (e.g., update status, fetch all orders).

Example Endpoints:

GET /api/admin/order - Fetch all orders.

PUT /api/admin/order/:id - Update order status by ID.

4. User Cart Management Routes
Base Path: /api/shop/cart

Router: CartRouter

Middleware: AuthMiddleware

Description: Allows users to manage their shopping cart.

Example Endpoints:

POST /api/shop/cart - Add a product to the cart.

GET /api/shop/cart - Fetch the user's cart.

DELETE /api/shop/cart/:id - Remove a product from the cart.

5. User Address Management Routes
Base Path: /api/shop/address

Router: AddressRouter

Middleware: AuthMiddleware

Description: Allows users to manage their addresses (e.g., shipping address).

Example Endpoints:

POST /api/shop/address - Add a new address.

GET /api/shop/address - Fetch all addresses.

PUT /api/shop/address/:id - Update an address by ID.

DELETE /api/shop/address/:id - Delete an address by ID.

6. Product Listing Routes
Base Path: /api/shop/products

Router: ShopProductRouter

Description: Allows users to browse products.

Example Endpoints:

GET /api/shop/products - Fetch all products.

GET /api/shop/products/:id - Fetch a product by ID.

7. Product Search Routes
Base Path: /api/shop/search

Router: SearchRouter

Description: Allows users to search for products.

Example Endpoints:

GET /api/shop/search?query=keyword - Search for products by keyword.

8. Product Review Routes
Base Path: /api/shop/review

Router: ReviewRouter

Middleware: AuthMiddleware

Description: Allows users to post and manage reviews for products.

Example Endpoints:

POST /api/shop/review - Add a review for a product.

GET /api/shop/review/:productId - Fetch reviews for a product.

DELETE /api/shop/review/:id - Delete a review by ID.

9. User Order Management Routes
Base Path: /api/shop/order

Router: ShopOrderRouter

Middleware: AuthMiddleware

Description: Allows users to manage their orders (e.g., place an order, fetch order history).

Example Endpoints:

POST /api/shop/order - Place a new order.

GET /api/shop/order - Fetch all orders for the user.

GET /api/shop/order/:id - Fetch an order by ID.

Testing the API
Use Postman or any API testing tool to test the endpoints.
https://documenter.getpostman.com/view/29492667/2sAYX2P4i2

Contact
For questions or feedback, feel free to reach out:

Name: Sujay Sharvesh

Email: sharveshsujay@gmail.com
