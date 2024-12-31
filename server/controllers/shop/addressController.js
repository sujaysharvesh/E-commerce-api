import { StatusCodes } from "http-status-codes";
import Address from "../../models/address.js"
import user from "../../models/user.js";


export const addAddress = async(req, res) => {
    try{
        const { userId, addressDetail , city, pincode, phone } = req.body;
        if(!userId || !addressDetail || !city || !pincode || !phone ){
            res.status(StatusCodes.NOT_ACCEPTABLE).json({message: "Someting missiong"})
        }
        const pincoderRegex = /^\d{6}$/;
        const phoneRegex = /^\d{10}$/;
        if(!pincoderRegex.test(pincode)){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Provide valid PinCode"})
        }
        if(!phoneRegex.test(phone)){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Provide valid Phone Number"})
        }
        const userAddress = await Address.create( {
            userId,
            address: addressDetail,
            city,
            pincode,
            phone
        } );
        const finialAddres = `${addressDetail}, ${city}, ${pincode}`
        res.status(StatusCodes.CREATED).json({succuss: true, user: userId, phoneNumber: phone, address: finialAddres}) 
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something wend wrong", error: err})
    }
}

export const updateAddress = async(req, res) => {
    try{
        const { userId, addressId } = req.params
        const formData = req.body;
        if(!userId || !addressId){
            res.status(StatusCodes.BAD_REQUEST).json({message: "user and address id is required"})
        }
        const userAddress = await Address.findOneAndUpdate(
            {
              _id: addressId,
              userId,
            },
            formData,
            { new: true }
          );
        if(!userAddress){
            res.status(StatusCodes.NOT_FOUND).json({ message: "Addres not Found"})
        }
        res.status(StatusCodes.ACCEPTED).json({succuss: true, updatedAddress: userAddress})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong"})
    }
}

export const getUserAllAddress = async(req, res) => {
    try{
        const { userId } = req.body;
        if(!userId){
            res.status(StatusCodes.BAD_GATEWAY).json({message: "UserId is required"})
        }
        const addresslist = await Address.find({ userId })
        if(!addresslist){
            res.status(StatusCodes.NOT_FOUND).json({message: "Address not Found"})
        }
        res.status(StatusCodes.OK).json({succuss: true, UserAddress: addresslist})

    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something Went Wrong"})
    }
}

export const getAllAddress = async(req, res) => {
    try{
        const addresslist = await Address.find({  })
        res.status(StatusCodes.OK).json({succuss: true, UserAddress: addresslist})

    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something Went Wrong"})
    }
}

export const deleteAddress = async(req, res) => {
    try{
        const { addressId } = req.body;
        if(!addAddress){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Address Id is required"})
        }
        const userAddress = await Address.findByIdAndDelete({addressId})
        if(!userAddress){
            res.status(StatusCodes.NOT_FOUND).json({message: "Address not Found"})
        }
        res.status(StatusCodes.OK).json({message: "Address succussfully deleted"})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Something Went wrong"})
    }
}