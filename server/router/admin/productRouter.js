import express from "express"
import { AddProduct, DeleteProduct, GetAllProduct, GetProducts, UpdateProduct } from "../../controllers/admin/productController.js"
import { upload } from "../../utils/cloudinary.js";

const router = express.Router()


router.get('/', GetAllProduct)
router.get('/static', GetProducts)
router.post('/addproduct',upload, AddProduct)
router.patch('/:ProductId', UpdateProduct)
router.delete('/:ProductId', DeleteProduct)


export default router;
