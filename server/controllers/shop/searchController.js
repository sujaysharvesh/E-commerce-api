import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js";

export const SearchProduct = async (req, res) => {
  try {
    const { keywords } = req.params;
    if (!keywords || typeof keywords !== "String") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "keyword is required and must be string" });
    }
    const RegEx = new RegExp(keywords, "i");
    const createSearchQuary = {
      $or: [
        { productName: RegEx },
        { description: RegEx },
        { category: RegEx },
        { brand: RegEx },
      ],
    };
    const searchResult = await Product.find(createSearchQuary).sort({
      price: 1,
    });
    res.status(StatusCodes.OK).json({ succuss: true, data: searchResult });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};
