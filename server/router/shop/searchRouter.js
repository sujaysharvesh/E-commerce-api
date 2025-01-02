import Express from "express";
import { SearchProduct } from "../../controllers/shop/searchController.js";

const router = Express.Router();

/**
 * @swagger
 * /api/shop/search/{keywords}:
 *   get:
 *     summary: Search products by keywords
 *     description: Use keywords to search for products in the shop.
 *     parameters:
 *       - in: path
 *         name: keywords
 *         required: true
 *         description: The search keywords to look for products
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching products
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
 *                   description:
 *                     type: string
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:keywords", SearchProduct);

export default router;
