import Express from "express";
import { getAllOrdersOfAllUser } from "../../controllers/product/orderController.js";


const router = Express.Router()

router.get("/allorders", getAllOrdersOfAllUser)


export default router;
