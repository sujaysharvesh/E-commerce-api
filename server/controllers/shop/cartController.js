import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js";
import cart from "../../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "Something is missing" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Product not Found" });
    }
    let userCart = await cart.findById(userId);
    if (!userCart) {
      userCart = await cart.create({ userId, items: [] });
    }
    const findCurrentProductIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      userCart.items.push({ productId, quantity });
    } else {
      userCart.items[findCurrentProductIndex].quantity += quantity;
    }
    await userCart.save();
    res.status(StatusCodes.CREATED).json({ success: true, data: userCart });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something Went Wrong" });
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
    const userCart = await Cart.findOne({ userId }).populate("items.productId");
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
      image: item.productId.image,
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
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const findCurrentProductIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present !",
        });
      }
  
      cart.items[findCurrentProductIndex].quantity = quantity;
      await cart.save();
  
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
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
  
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
  
      await cart.save();
  
      await cart.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = cart.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
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