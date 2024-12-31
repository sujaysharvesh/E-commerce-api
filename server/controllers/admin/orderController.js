import { StatusCodes } from "http-status-codes";
import order from "../../models/order.js";


export const getAllOrdersOfAllUser = async(req, res) => {
    try{
        const orders = await order.find({ })
        if(!orders.length){
            res.status(StatusCodes.OK).json({message: "No orders Found"})
        }
        res.status(StatusCodes.OK).json(orders)
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"})
    }
}

export const getOrderDetailsForAdmin = async(req, res) => {
    try{
        const { orderId } = req.params;
        const OrderDetail = await order.findById(orderId)
        if(!OrderDetail){
            res.status(StatusCodes.NOT_FOUND).json({Message: "Something Went Wrong"})
        }
        res.status(StatusCodes.OK).json({"OrderDetail": OrderDetail })
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something Went Wrong"})
    }
}

