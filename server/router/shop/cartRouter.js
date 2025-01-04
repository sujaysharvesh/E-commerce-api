import express from "express";
import { addToCart, fetchCartItems, removeProductFromCart, updateCartItemQty } from "../../controllers/shop/cartController.js";

const router = express.Router();

/**
 * @swagger
 * /api/shop/cart/:
 *   get:
 *     tags:
 *          - Cart
 *     summary: Get all cart items of a user
 *     description: Fetches all the items in the cart for the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: The ID of the product in the cart
 *                   quantity:
 *                     type: number
 *                     description: The quantity of the product in the cart
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                   total:
 *                     type: number
 *                     description: The total price for the quantity of the product
 *       400:
 *         description: Bad Request (Invalid user ID)
 *       500:
 *         description: Internal Server Error
 */
router.get("/", fetchCartItems);

/**
 * @swagger
 * /api/shop/cart/addtocart:
 *   post:
 *     tags:
 *          - Cart
 *     summary: Add a product to the cart
 *     description: Adds a product to the user's cart with the specified quantity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add to the cart
 *     responses:
 *       201:
 *         description: Product successfully added to the cart
 *       400:
 *         description: Bad Request (Invalid input or user ID)
 *       500:
 *         description: Internal Server Error
 */
router.post("/addtocart", addToCart);

/**
 * @swagger
 * /api/shop/cart/updatecart/{userId}:
 *   patch:
 *     tags:
 *          - Cart
 *     summary: Update the quantity of an item in the cart
 *     description: Updates the quantity of a specific product in the cart for the given user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product in the cart
 *               quantity:
 *                 type: number
 *                 description: The updated quantity of the product
 *     responses:
 *       200:
 *         description: Cart item quantity successfully updated
 *       400:
 *         description: Bad Request (Invalid input or user ID)
 *       404:
 *         description: Product not found in the cart
 *       500:
 *         description: Internal Server Error
 */
router.patch("/updatecart", updateCartItemQty);

/**
 * @swagger
 * /remove-product:
 *   patch:
 *     summary: Remove a product from the cart
 *     description: This endpoint removes a specific product from the user's cart based on the provided product ID and user details.
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to remove from the cart.
 *                 example: "64a7f7d3a6f4bca77cdef456"
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to remove.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product removed from cart successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid product ID or quantity
 *       404:
 *         description: Product not found in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found in cart
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 */
router.patch("/remove-product", removeProductFromCart);

router.patch("/remove-product", removeProductFromCart);

export default router;

