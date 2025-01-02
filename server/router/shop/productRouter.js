import express from "express";
import { getFilteredProduct, productDetail } from "../../controllers/shop/productController.js";

const router = express.Router();

/**
 * @swagger
 * /api/shop/products/get:
 *   get:
 *     summary: Get filtered products
 *     description: Fetch products based on applied filters (like category, price, etc.)
 *     parameters:
 *       - in: query
 *         name: category
 *         description: The category of the products to filter by
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         description: The price range to filter by
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand
 *         description: The brand to filter by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   brand:
 *                     type: string
 *       400:
 *         description: Invalid filter parameters
 *       500:
 *         description: Internal Server Error
 */
router.get("/get", getFilteredProduct);

/**
 * @swagger
 * /api/shop/products/get/{productId}:
 *   get:
 *     summary: Get product details
 *     description: Fetch detailed information of a specific product.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The unique identifier of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *       400:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/get/:productId", productDetail);

export default router;
