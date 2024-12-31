import expres from "express"
import { addToCart, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cartController.js"

const router = expres.Router()


router.get("/:userId", fetchCartItems)
router.post("/addtocart", addToCart)
router.patch("/updatecart/:userId", updateCartItemQty)

export default router;
