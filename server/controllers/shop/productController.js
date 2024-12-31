import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js"

export const getFilteredProduct = async(req, res) => {
    try{
        const { category=[], brand=[], sortBy= "price-lowToHigh"} = req.quary;
    let filters = {};
    if(category.length){
        filters.category = { $in: category.split(",")}
    }
    if(brand.length){
        filters.brand = { $in: brand.split(",")}
    }
    let sort = {};
    switch(sortBy){
        case "price-lowtohigh":
            sort.price = 1;
            break;
        case "price-hightolow":
            sort.price = -1;
            break;
        case "title-atoz":
            sort.title = 1;
            break;
        case "title-ztoa":
            sort.title = -1;
            break;
        default:
            sort.price = 1;
            break;    
    }
    const products = await Product.find(filters).sort(sort);
    res.status(StatusCodes.OK).json({succuss: true, data: products})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Message: "Something went wrong"})
    }
}

export const productDetail = async(req, res) => {
    try{
        const { productId } = req.params;
        const productDetail = await Product.findById({productId});
        if(!productDetail){
            req.status(StatusCodes.NOT_FOUND).json({message:"product Not Found"})
        }
        res.status(StatusCodes.OK).json({succuss: true, data: productDetail})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Message: "something went wrong"})
    }
}