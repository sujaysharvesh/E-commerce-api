import { StatusCodes } from "http-status-codes";
import order from "../../models/order.js";
import Product from "../../models/Product.js";
import reviews from "../../models/reviews.js";

export const createReview = async (req, res) => {
  try {
    const { userId, productId, userName, rating, comment } = req.body;
    const orderDetail = await order.findOne({
      userId: userId,
      "cartItems.productId": productId,
    });

    if (!orderDetail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "you have not purchased this product" });
    }
    const checkExistinReview = await reviews.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkExistinReview) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "you have already reviewed this product" });
    }

    const newReview = await reviews.create({
      userId,
      productId,
      userName,
      comment,
      rating,
    });
    const productReview = await reviews.find({ productId: productId });
    const totalReviews = productReview.length;
    const avgRating =
      productReview.reduce((acc, item) => item.rating + acc, 0) / totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview: avgRating });

    res.status(StatusCodes.CREATED).json({ newReview });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "something went wrong" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment, userName } = req.body;
    const reviewDetail = await reviews.findOne({
      userId: userId,
      productId: productId,
    });
    if (!reviewDetail) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "you have not reviewed this product" });
    }
    const updatedReview = await reviews.findByIdAndUpdate(
      { _id: reviewDetail._id },
      { rating, comment, userName },
      { new: true }
    );
    const prodcutReview = await reviews.find({ productId: productId });
    const totalReviews = prodcutReview.length;
    const avgRating =
      prodcutReview.reduce((acc, item) => item.rating + acc, 0) / totalReviews;
    await Product.findByIdAndUpdate(productId, { averageReview: avgRating });
    res.status(StatusCodes.OK).json({ updatedReview });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "something went wrong" });
  }
};

export const getProdcutAllReview = async(req, res) => {
    try{
        const { productId } = req.params;
        const productReview = await reviews.find({productId: productId});
        res.status(StatusCodes.OK).json({productReview})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Message: "Something went wrong"})
    }
}

export const deleteReview = async(req, res) => {
    try{
        const { reviewId } = req.params;
        const reviewDetail = await reviews.findByIdAndDelete(reviewId);
        res.status(StatusCodes.OK).json({Message: "Review Deleted"})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Message: "Something went Wrong"})
    }
}