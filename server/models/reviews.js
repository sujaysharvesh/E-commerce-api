import mongoose from "mongoose";

const ProductReview = new mongoose.Schema(
    {
        userId: String,
        productId: String,
        userName: String,
        reviewMessage: String,
        reviewValure: Number
    },
    {
        timestamps: true
    }
)

export default mongoose.Schema("ProductReview", ProductReview)