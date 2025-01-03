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
      enum: ["user", "admin"],
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

  UserSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const update = this.getUpdate();
        if (update.password) {
            const salt = await bcrypt.genSalt(12);
            update.password = await bcrypt.hash(update.password, salt);
        }
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

  UserSchema.methods.generatePasswordResetToken = function () {
    return Jwt.sign(
      { email: this.email },
      process.env.JWT_TOKEN,
      { expiresIn: "10m"}
    )
  }

export default mongoose.model("User", UserSchema);