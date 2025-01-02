import express from "express";
import { AddProduct, DeleteProduct, GetAllProduct, GetProducts, UpdateProduct } from "../../controllers/admin/productController.js";
import { upload } from "../../utils/cloudinary.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/product:
 *   get:
 *     summary: Get all products
 *     description: Fetches all the products from the database.
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: The product's unique identifier
 *                   name:
 *                     type: string
 *                     description: The product's name
 *                   price:
 *                     type: number
 *                     description: The product's price
 *       500:
 *         description: Internal Server Error
 */
router.get('/', GetAllProduct);

/**
 * @swagger
 * /api/admin/product/static:
 *   get:
 *     summary: Get static products
 *     description: Fetches a static list of products, possibly from a predefined source or file.
 *     responses:
 *       200:
 *         description: A static list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: The product's unique identifier
 *                   name:
 *                     type: string
 *                     description: The product's name
 *                   price:
 *                     type: number
 *                     description: The product's price
 *       500:
 *         description: Internal Server Error
 */
router.get('/static', GetProducts);

/**
 * @swagger
 * /api/admin/product/addproduct:
 *   post:
 *     summary: Add a new product
 *     description: Allows the admin to add a new product to the database, including uploading an image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Wireless Mouse"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 29.99
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the product
 *     responses:
 *       201:
 *         description: Successfully added a product
 *       400:
 *         description: Bad Request (invalid input)
 *       500:
 *         description: Internal Server Error
 */
router.post('/addproduct', upload, AddProduct);

/**
 * @swagger
 * /api/admin/product/{ProductId}:
 *   patch:
 *     summary: Update a product
 *     description: Updates the details of a specific product based on its product ID.
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: The unique identifier of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product
 *                 example: "Updated Product"
 *               price:
 *                 type: number
 *                 description: The updated price of the product
 *                 example: 39.99
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       400:
 *         description: Bad Request (invalid input)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/:ProductId', UpdateProduct);

/**
 * @swagger
 * /api/admin/product/{ProductId}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product based on its product ID.
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: The unique identifier of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:ProductId', DeleteProduct);

export default router;
