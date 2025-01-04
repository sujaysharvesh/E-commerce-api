import StatusCodes  from "http-status-codes";
import order from "../../models/order.js";
import Product from "../../models/Product.js";
import cart from "../../models/cart.js";
import address from "../../models/address.js";


export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await cart.findOne({ userId }).populate("items.productId");
    if (!userCart || !userCart.items.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Cart not found or empty" });
    }

    if (userCart.items.some((item) => !item.productId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "One or more cart items are missing productId" });
    }
    const userAddress = await address.findOne({ userId });
    if (!userAddress) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Address not found" });
    }

    const cartItems = userCart.items.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.productName || "Unknown Product",
      price: item.productId.salePrice || 0,
      quantity: item.quantity || 1,
    }));

    for (const item of userCart.items) {
      const updatedProduct = await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { totalStock: -item.quantity } },
        { new: true } // Return updated document
      );

      if (!updatedProduct) {
        throw new Error(`Product not found: ${item.productId.productName}`);
      }

      if (updatedProduct.totalStock < 0) {
        throw new Error(
          `Insufficient stock for product: ${updatedProduct.productName}. Available stock: ${
            updatedProduct.totalStock + item.quantity
          }`
        );
      }
    }
  
    const newOrder = await order.create({
      userId: userId,
      cartItems: cartItems,
      addressInfo: {
        addressId: userAddress._id,
        address: userAddress.address,
        city: userAddress.city,
        pincode: userAddress.pincode,
        phone: userAddress.phone,
      },
      totalAmount: userCart.total.toFixed(2),
    });

    const deletedCart = await cart.findByIdAndDelete(userCart._id);

    res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};



export const capturePayment = async (req, res) => {
    try{
        const { paymentId, payerId, orderId } = req.body;
        const orderDetail = await order.findById(orderId);
        if(!orderDetail){
            return res.status(StatusCodes.NOT_FOUND).json({message: "Order not found"})
        }
        orderDetail.paymentStatus = "Paid";
        orderDetail.orderStatus =  "Confirmed";
        orderDetail.paymentId = paymentId;
        orderDetail.payerId = payerId;
        for(let item of orderDetail.cartItems){
            let product = await Product.findById(item.productId);
            if(!product){
                return res.status(StatusCodes.NOT_FOUND).json({message: `Not enough stock fot this product ${item.productName}`})
            }
            product.totalStock -= item.quantity;
            await product.save();
            const getCart = await cart.findByIdAndDelete(orderDetail.cartId);
            res.status(StatusCodes.OK).json({message: "Order confirmed"})
        }
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"})
    }
}


export const getAllOrderByuser = async(req, res) => {
    try{
        const userId = req.user.userId;
        const orders = await order.find({userId: userId});
        if(!orders){
            return res.status(StatusCodes.NOT_FOUND).json({message: "No order found"})
        }
        res.status(StatusCodes.OK).json({orders})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"})
    }
}

export const getOrderDetail = async(req, res) => {
    try{
        const { orderId } = req.params;
        const orderDetail = await order.findById(orderId);
        if(!orderDetail){
            return res.status(StatusCodes.NOT_FOUND).json({message: "Order not found"})
        }
        res.status(StatusCodes.OK).json({orderDetail})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong", error: err})
    }
}