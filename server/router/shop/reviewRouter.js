import Express from "express";
import {
  createReview,
  deleteReview,
  getProdcutAllReview,
  updateReview,
} from "../../controllers/shop/reviewController.js";

const router = Express.Router();

router.get("/:productId", getProdcutAllReview);
router.post("/add", createReview);
router.patch("/updatereview", updateReview);
router.delete("/deletereview", deleteReview);

export default router;
