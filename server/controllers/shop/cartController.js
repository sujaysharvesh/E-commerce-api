import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js";
import cart from "../../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0 || !Number.isInteger(quantity)) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "Invalid data provided!" });
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

    const totalItemPrice = product.salePrice * quantity;  
    if (existingProductIndex === -1) {
      await cart.updateOne(
        { userId },
        {
          $push: { items: { productId, quantity, total: totalItemPrice } },
          $inc: { total: totalItemPrice }
        }
      );
    } else {
      const existingProduct = userCart.items[existingProductIndex];
      const updatedTotalItemPrice = existingProduct.total + totalItemPrice;

      await cart.updateOne(
        { userId, "items.productId": productId },
        {
          $inc: { "items.$.quantity": quantity, total: totalItemPrice },
          $set: { "items.$.total": updatedTotalItemPrice }
        }
      );
    }

    const updatedCart = await cart.findOne({ userId });
    res.status(StatusCodes.CREATED).json({ success: true, data: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something Went Wrong",
      error: err.message,
    });
  }
};


export const fetchCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;
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
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity
    }));
    const total = userCart.total;
    res.status(StatusCodes.OK).json({
      data: {
        cartId: userCart._id,
        items: populateCartItems,
        total: total
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
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID and a valid quantity are required!",
      });
    }

    const userCart = await cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const productIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart!",
      });
    }

    userCart.items[productIndex].quantity = quantity;

    await userCart.populate({
      path: "items.productId",
      select: "price salePrice",
    });

    userCart.total = userCart.items.reduce((acc, item) => {
      const itemTotal = item.quantity * (item.productId.salePrice || item.productId.price || 0);
      return acc + itemTotal;
    }, 0);

    if (isNaN(userCart.total)) {
      throw new Error("Invalid total value calculated");
    }
    await userCart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully!",
      data: {
        cartId: userCart._id,
        items: userCart.items,
        total: userCart.total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the cart!",
    });
  }
};

  
  export const removeProductFromCart = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const { productId } = req.body;
      
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }

      const userCart = await cart.findOne({ userId });
      if (!userCart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const findCurrentProductIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Cart item not present!",
        });
      }
      userCart.items.splice(findCurrentProductIndex, 1);
      await userCart.populate({
        path: "items.productId",
        select: "price salePrice",
      });
      userCart.total = userCart.items.reduce((acc, item) => {
        const itemTotal = item.quantity * (item.productId.salePrice || item.productId.price || 0);
        return acc + itemTotal;
      }, 0);
      await userCart.save();
  
      res.status(200).json({
        success: true,
        message: "Product removed from cart",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };
  