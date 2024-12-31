import Express from "express";
import { addAddress, deleteAddress, getAllAddress, getUserAllAddress } from "../../controllers/shop/addressController.js";

const router = Express.Router()

router.get("/", getAllAddress)
router.get("/:userId", getUserAllAddress)
router.post("/addAddress", addAddress)
router.delete("/:userId", deleteAddress)

export default router;
