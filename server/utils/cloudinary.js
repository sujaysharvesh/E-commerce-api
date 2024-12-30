import cloudinary from "cloudinary"
import multer from "multer"
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


export async function imageUploadUtil(fileBuffer, mimeType) {
    try {
      const base64Data = fileBuffer.toString('base64');  
      const dataUri = `data:${mimeType};base64,${base64Data}`; 
  
      const result = await cloudinary.uploader.upload(dataUri, {
        resource_type: "auto",  
      });
  
      return result;  
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw new Error("Image upload failed");
    }
  }

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { files: 5, fileSize: 5 * 1024 * 1024 }, 
  }).array('images', 5); 