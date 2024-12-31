import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true, 
      maxlength: 255, 
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: /^\d{6}$/, 
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", AddressSchema);
