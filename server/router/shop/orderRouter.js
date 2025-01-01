import Express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrderByuser,
  getOrderDetail,
} from "../../controllers/shop/orderController.js";

const router = Express.Router();

router.get("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrderByuser);
router.get("/details/:orderid", getOrderDetail);

export default router;
