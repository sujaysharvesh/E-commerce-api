import Express from "express";
import { getFilteredProduct, productDetail } from "../../controllers/shop/productController.js";

const router  = Express.Router()

router.get("/ger", getFilteredProduct)
router.get("get/:productId", productDetail)

export default router;
