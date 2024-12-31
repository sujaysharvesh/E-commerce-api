import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js";
import cart from "../../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate inputs
    if (!userId || !productId || quantity <= 0) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "Something is missing" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not Found" });
    }

    let userCart = await cart.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, items: [] } }, 
      { upsert: true, new: true }
    );
    const existingProductIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex === -1) {
      await cart.updateOne(
        { userId },
        { $push: { items: { productId, quantity } } }
      );
    } else {
      await cart.updateOne(
        { userId, "items.productId": productId },
        { $inc: { "items.$.quantity": quantity } }
      );
    }
    const updatedCart = await cart.findOne({ userId });
    res.status(StatusCodes.CREATED).json({ success: true, data: updatedCart });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something Went Wrong", error: err });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "UserID is required" });
    }
    const userCart = await cart.findOne({ userId }).populate("items.productId");
    if (!userCart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not Found" });
    }
    const validItems = userCart.items.filter(
      (productItem) => productItem.productId
    );
    if (validItems.length < userCart.items.length) {
      userCart.items = validItems;
      await userCart.save();
    }
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.productName,
      name: item.productId.productName,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(StatusCodes.OK).json({
      data: {
        items: populateCartItems,
      },
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};


export const updateCartItemQty = async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      const userCart = await cart.findOne({ userId });
      if (!userCart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided! Product and valid quantity are required.",
        });
      }
      
      const findCurrentProductIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present !",
        });
      }
  
      userCart.items[findCurrentProductIndex].quantity = quantity;
      await userCart.save();
  
      await userCart.populate({
        path: "items.productId",
        select: "image productName price salePrice",
      });
  
      const populateCartItems = userCart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        productName: item.productId ? item.productId.productName : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  
export const deleteCartItem = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const userCart = await cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image productName price salePrice",
      });
  
      if (!userCart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      userCart.items = userCart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
  
      await userCart.save();
  
      await userCart.populate({
        path: "items.productId",
        select: "image productName price salePrice",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        productName: item.productId ? item.productId.productName : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cart._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };