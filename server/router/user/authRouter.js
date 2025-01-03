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

router.post("/testmail", testMail);

router.post("/forgot-password",AuthMiddleware,  forgotPassword);

router.post('/reset-password/:token', resetPassword);

export default router;
