import StatusCode from "http-status-codes";
import { imageUploadUtil } from "../../utils/cloudinary.js";
import Product from "../../models/Product.js";

export const GetAllProduct = async (req, res) => {
  try {
    const listProduct = await Product.find({});
    res.status(StatusCode.OK).json({ success: true, products: listProduct });
  } catch (err) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Something Went Wrong" });
  }
};

export const AddProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
    const imageUrls = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const result = await imageUploadUtil(file.buffer, file.mimetype);
      imageUrls.push(result.secure_url);
    }
    const {
      productName,
      price,
      salePrice,
      category,
      brand,
      description,
      totalStock,
      averageReview,
    } = req.body;
    const newlyCreatedProduct = await Product.create({
      image: imageUrls,
      productName,
      price,
      salePrice,
      category,
      brand,
      description,
      totalStock,
      averageReview,
    });
    res
      .status(StatusCode.CREATED)
      .json({ success: true, data: newlyCreatedProduct });
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err });
  }
};

export const GetProducts = async (req, res) => {
  try {
    const { productName } = req.body;
    if (!productName) {
      res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "product name is required" });
    }
    const result = await Product.find({
      productName: { $regex: productName, $options: "i" },
    });
    res.status(StatusCode.OK).json({ result, nbhits: result.length });
  } catch (err) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong" });
  }
};

export const UpdateProduct = async (req, res) => {
    try {
      const { ProductId } = req.params; 
      const productDetails = req.body; 
      
      if (!ProductId) {
        return res.status(StatusCode.BAD_REQUEST).json({ message: "Product id is required" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        ProductId, 
        productDetails, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedProduct) {
        return res.status(StatusCode.NOT_FOUND).json({ message: "Product not found" });
      }
      res.status(200).json({ success: true, updatedProduct });
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong", error: err.message });
    }
  };
  
export const DeleteProduct = async(req, res) => {
    try{
        const { ProductId } = req.params;
        const result = await Product.findByIdAndDelete(ProductId)
        res.status(StatusCode.OK).json({message: "Product has been Deleted"})
    }
    catch(err){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: "Something went Worong"})
    }
}