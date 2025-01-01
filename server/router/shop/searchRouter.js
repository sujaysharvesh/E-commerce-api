import Express from "express";
import { SearchProduct } from "../../controllers/shop/searchController.js";

const router = Express.Router()

router.get("/:keywords", SearchProduct);

export default router;
