import { StatusCodes } from "http-status-codes";
import User from "../../models/user.js";
import redis from "../../utils/redis.js";
import { mailSender } from "../../utils/mail.js";
import Jwt from "jsonwebtoken";

export const UserRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }

    // Validate role
    if (role !== "admin" && role !== "user") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Role must be either 'admin' or 'user'" });
    }

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    // Send success response
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user: newUser });

  } catch (err) {
    // Handle errors
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};


export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide email and password" });
    }
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
    const isValidPassword = await userDetails.comparePassword(password);
    if (!isValidPassword) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
    const token = userDetails.createJWT();
    const REDIS_LIFESPAN = 30 * 24 * 60 * 60;
    redis.setex(`auth:${userDetails._id}`, REDIS_LIFESPAN, token);
    res.status(StatusCodes.OK).json({ user: userDetails.username, token });
  } catch (err) {
    console.error("Login error:", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export const LogOut = async (req, res) => {
  const userId = req.user.userId;
  await redis.del(`auth:${userId}`);
  res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
    const token = userDetails.generatePasswordResetToken({
      email: userDetails.email,
    });
    console.log(userDetails.email);
    const restLink = `http://${process.env.HOST}:${process.env.PORT}/api/auth/reset-password/${token}`;
    const subject = "Password Reset Request";
    const text = `Hello ${userDetails.username},\nPlease click on the link to reset your password`;
    const html = `<a href="${restLink}">Reset Password</a>`;
    await mailSender(userDetails.email, subject, text, html);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset link sent to your email", link: restLink });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong. Please try again later.", error: err.message });
  }
};

export const resetPassword = async(req, res) => {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ message: "Passwords do not match" });
      }
      try{
        const payload = Jwt.verify(token, process.env.JWT_TOKEN);
        const updatedPassword = await User.findOneAndUpdate({email: payload.email}, {password}, {new:true});
        res.status(StatusCodes.OK).json({message: "Password updated successfully"})
      }
      catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong. Please try again later.", error: err.message})
      }
}

export const testMail = async (req, res) => {
  const { email, username } = req.body;
  const subject = "Welcome to Our Service!";
  const text = `Hello ${username},\nThank you for registering!`;
  const html = `<h1>Hello ${username},</h1><p>Thank you for registering!</p>`;

  try {
    await mailSender(email, subject, text, html);
    res
      .status(200)
      .json({ message: "User registered successfully and email sent" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
};
