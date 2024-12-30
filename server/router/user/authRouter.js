import express  from "express";
import { LoginUser, UserRegister } from "../../controllers/user/authController.js";

const router = express.Router()

router.post('/register', UserRegister)
router.post('/login', LoginUser)

export default router;
