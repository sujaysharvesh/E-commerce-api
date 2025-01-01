import mongoose from "mongoose";

const ProductReview = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Review", ProductReview)