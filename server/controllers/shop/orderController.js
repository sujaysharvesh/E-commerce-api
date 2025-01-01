import StatusCodes  from "http-status-codes";
import client  from "../../utils/paypal.js";
import order from "../../models/order.js";
import Product from "../../models/Product.js";
import cart from "../../models/cart.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount, // Corrected typo
      orderData,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.name,
              sku: item._id,
              price: item.price,
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2), 
          },
          description: "This is the payment description.",
        },
      ],
    };

    client.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error while creating payment" });
      } else {s
        const newlyCreatedOrder = await order.create({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderData,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });
        const approvalUrl = paymentInfo.links.find((link) => link.rel === "approval_url").href;
        res.status(StatusCodes.CREATED).json({ approvalUrl, order_id: newlyCreatedOrder._id });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
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
        const { userId } = req.params;
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