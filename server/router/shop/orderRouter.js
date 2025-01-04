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
router.get("/", createOrder);



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
router.get("/list", getAllOrderByuser);



export default router;

