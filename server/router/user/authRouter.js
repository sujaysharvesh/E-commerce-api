import express  from "express";
import { LogOut, LoginUser, UserRegister, forgotPassword, resetPassword, testMail } from "../../controllers/user/authController.js";
import { AuthMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: 
 *          - User
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Successfully registered user
 *       400:
 *         description: Bad Request (invalid input)
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', UserRegister);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: 
 *          - User
 *     summary: Login a user
 *     description: This endpoint allows an existing user to login by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token to access protected resources
 *                   example: "your-jwt-token"
 *       400:
 *         description: Invalid credentials (bad request)
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', LoginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out the user and invalidates the session.
 *     description: This endpoint logs out the user by removing the authentication token and invalidating the session.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       400:
 *         description: Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post("/logout",AuthMiddleware, LogOut);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: This endpoint allows a user to request a password reset by providing their email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address to send the password reset link.
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
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
 *                   example: "Password reset link sent to your email"
 *       400:
 *         description: Invalid email address
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
 *                   example: "Invalid email address"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong"
 */

router.post("/forgot-password",AuthMiddleware,  forgotPassword);
/**
 * @swagger
 * api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     description: This endpoint allows a user to reset their password using the token received via email.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: The token received in the password reset email.
 *         schema:
 *           type: string
 *           example: "abcd1234reset-token"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password to set for the user.
 *                 example: "newSecurePassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully
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
 *                   example: "Password reset successful"
 *       400:
 *         description: Invalid or expired token, or weak password
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
 *                   example: "Invalid token or weak password"
 *       404:
 *         description: Token not found or expired
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
 *                   example: "Token expired or invalid"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong"
 */
router.post('/reset-password/:token', resetPassword);

export default router;
