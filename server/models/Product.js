import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  image: { 
    type: [String], 
    required: false
  },
  productName: {
    type: String,
    required: true,
    maxlength: 30,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: false,  
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalStock: {
    type: Number,
    required: true,
    min: 1,  
  },
  averageReview: {
    type: Number,
    default: 0, 
  },
});

export default mongoose.model('Product', ProductSchema);
