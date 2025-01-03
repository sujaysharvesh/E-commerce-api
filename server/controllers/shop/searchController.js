import { StatusCodes } from "http-status-codes";
import Product from "../../models/Product.js";

export const SearchProduct = async (req, res) => {
  try {
    const { keywords } = req.params;

    if (!keywords || typeof keywords !== "string") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Keyword is required and must be a string" });
    }

    const RegEx = new RegExp(keywords, "i");
    const createSearchQuery = {
      $or: [
        { productName: RegEx },
        { description: RegEx },
        { category: RegEx },
        { brand: RegEx },
      ],
    };
    const searchResult = await Product.find(createSearchQuery).sort({
      price: 1, 
    });

    if (searchResult.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No products found matching the search criteria" });
    }

    res.status(StatusCodes.OK).json({ success: true, data: searchResult });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong", error: err.message });
  }
};
