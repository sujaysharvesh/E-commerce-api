import { StatusCodes } from "http-status-codes";
import User from "../../models/user.js";

export const UserRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      username,
      email,
      password
    });
    return res.status(StatusCodes.CREATED).json({ message: "User created successfully", User: newUser });

  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message }); 
  }
};


export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide email and password" });
    }
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
    const isValidPassword = await userDetails.comparePassword(password);
    if (!isValidPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
    const token = userDetails.createJWT();
    return res.status(StatusCodes.OK).json({ user: userDetails.username, token });

  } catch (err) {
    console.error("Login error:", err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export const LogOut = async (req, res) => {
  try{
    res.clearCookie("token").status(200).json({ message: "Logged out successfully "})
  }
  catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Someting went wrong. Please try again later"})
  }
}