import express from "express";
import {
  createReview,
  deleteReview,
  getProdcutAllReview,
  updateReview,
} from "../../controllers/shop/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * /api/shop/review/{productId}:
 *   get:
 *     tags: 
 *          - Review
 *     summary: Get all reviews for a product
 *     description: Fetch all reviews for a specific product.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The unique identifier of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                   userName:
 *                     type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:productId", getProdcutAllReview);

/**
 * @swagger
 * /api/shop/review/add:
 *   post:
 *     tags: 
 *          - Review
 *     summary: Add a new review for a product
 *     description: Add a review for a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               userName:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", createReview);

/**
 * @swagger
 * /api/shop/review/updatereview/{reviewId}:
 *   patch:
 *     tags: 
 *          - Review
 *     summary: Update a specific review
 *     description: Update an existing review.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The unique identifier of the review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/updatereview/:reviewId", updateReview);

/**
 * @swagger
 * /api/shop/review/deletereview/{reviewId}:
 *   delete:
 *     tags: 
 *          - Review
 *     summary: Delete a specific review
 *     description: Delete a specific review by ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The unique identifier of the review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/deletereview/:reviewId", deleteReview);

export default router;
