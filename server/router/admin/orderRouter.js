import Express from "express";
import { getAllOrdersOfAllUser } from "../../controllers/admin/orderController.js";


const router = Express.Router()

router.get("/allorders", getAllOrdersOfAllUser)


export default router;
