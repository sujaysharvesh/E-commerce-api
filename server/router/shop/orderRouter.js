import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrderByuser,
  getOrderDetail,
} from "../../controllers/shop/orderController.js";

const router = express.Router();

/**
 * @swagger
 * /api/shop/order/create:
 *   get:
 *     tags: 
 *          - Order
 *     summary: Create a new order
 *     description: Creates a new order based on the user's cart and other provided information.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: cartItems
 *         required: true
 *         description: List of cart items to be included in the order
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad Request (Invalid input or user ID)
 *       500:
 *         description: Internal Server Error
 */
router.get("/create", createOrder);

/**
 * @swagger
 * /api/shop/order/capture:
 *   post:
 *     tags: 
 *          - Order
 *     summary: Capture payment for an order
 *     description: Captures the payment for an order after the payment has been approved.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *               payerId:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment captured successfully
 *       400:
 *         description: Bad Request (Invalid payment or order ID)
 *       500:
 *         description: Internal Server Error
 */
router.post("/capture", capturePayment);

/**
 * @swagger
 * /api/shop/order/list/{userId}:
 *   get:
 *     tags: 
 *          - Order
 *     summary: Get all orders of a user
 *     description: Retrieves all orders placed by a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all orders placed by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   orderStatus:
 *                     type: string
 *       400:
 *         description: Bad Request (Invalid user ID)
 *       500:
 *         description: Internal Server Error
 */
router.get("/list/:userId", getAllOrderByuser);

/**
 * @swagger
 * /api/shop/order/details/{orderid}:
 *   get:
 *     tags: 
 *          - Order
 *     summary: Get details of a specific order
 *     description: Retrieves detailed information about a specific order using its order ID.
 *     parameters:
 *       - in: path
 *         name: orderid
 *         required: true
 *         description: The unique identifier of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                 orderDate:
 *                   type: string
 *                   format: date-time
 *                 orderStatus:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       price:
 *                         type: number
 *                       total:
 *                         type: number
 *       400:
 *         description: Bad Request (Invalid order ID)
 *       500:
 *         description: Internal Server Error
 */
router.get("/details/:orderid", getOrderDetail);

export default router;

