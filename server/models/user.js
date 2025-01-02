import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "please Provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "please Provide a email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "please Provide a password"],
      minlength: 8,
    },
    role:{
      type:String,
      default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  });

  UserSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err); 
    }
  });
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw new Error("Password comparison failed");
    }
  };
  
  UserSchema.methods.createJWT = function () {
    return Jwt.sign(
      { userID: this._id, username: this.username, role: this.role },
      process.env.JWT_TOKEN,
      { expiresIn: process.env.JWT_LIFETIME }
    );
  }

export default mongoose.model("User", UserSchema);