import Express from "express";
import { getAllOrdersOfAllUser } from "../../controllers/admin/orderController.js";


const router = Express.Router()
/**
 * @swagger
 * /api/admin/order/allorders:
 *   get:
 *     summary: Get all orders from all users
 *     description: This endpoint retrieves all the orders placed by all users.
 *     responses:
 *       200:
 *         description: A list of orders from all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: The order ID
 *                     example: "605c72ef153207a9c43fb9d8"
 *                   userId:
 *                     type: string
 *                     description: The user who placed the order
 *                     example: "5f92bdf6b5b76d8bbd1220f3"
 *                   totalAmount:
 *                     type: number
 *                     description: Total amount of the order
 *                     example: 150.50
 *                   status:
 *                     type: string
 *                     description: Current status of the order
 *                     example: "shipped"
 *                   createdAt:
 *                     type: string
 *                     description: Date when the order was created
 *                     example: "2021-03-10T12:35:14.112Z"
 *       500:
 *         description: Internal Server Error
 */
router.get("/allorders", getAllOrdersOfAllUser);

export default router;
