import express from "express";
import { AddAddress, deleteAddress, getAllAddress, getUserAllAddress, updateAddress } from "../../controllers/shop/addressController.js";

const router = express.Router();

/**
 * @swagger
 * /api/shop/address:
 *   get:
 *     summary: Get all addresses of a user
 *     description: Fetches all the addresses associated with the authenticated user.
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   addressId:
 *                     type: string
 *                     description: The unique identifier of the address
 *                   street:
 *                     type: string
 *                     description: The street address
 *                   city:
 *                     type: string
 *                     description: The city of the address
 *                   postalCode:
 *                     type: string
 *                     description: The postal code of the address
 *       401:
 *         description: Unauthorized (User not logged in)
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getUserAllAddress);

/**
 * @swagger
 * /api/shop/address/addAddress:
 *   post:
 *     summary: Add a new address
 *     description: Adds a new address to the authenticated user's profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: The street address
 *               city:
 *                 type: string
 *                 description: The city of the address
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the address
 *               country:
 *                 type: string
 *                 description: The country of the address
 *     responses:
 *       201:
 *         description: Address successfully added
 *       400:
 *         description: Bad Request (Invalid input)
 *       500:
 *         description: Internal Server Error
 */
router.post("/addAddress", AddAddress);

/**
 * @swagger
 * /api/shop/address/{addressId}:
 *   patch:
 *     summary: Update an existing address
 *     description: Updates the details of an address based on the provided address ID.
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The unique identifier of the address to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: The street address
 *               city:
 *                 type: string
 *                 description: The city of the address
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the address
 *               country:
 *                 type: string
 *                 description: The country of the address
 *     responses:
 *       200:
 *         description: Address successfully updated
 *       400:
 *         description: Bad Request (Invalid input)
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:addressId", updateAddress);

/**
 * @swagger
 * /api/shop/address/{addressId}:
 *   delete:
 *     summary: Delete an address
 *     description: Deletes an address based on the provided address ID.
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The unique identifier of the address to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address successfully deleted
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:addressId", deleteAddress);

export default router;
