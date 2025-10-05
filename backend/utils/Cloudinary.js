import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import CustomError from './CustomError.js';
dotenv.config()
import fs from 'fs'

// Configuration
   cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

export const cloudinaryUpload= async(filePath,resourceType='auto')=>{
   try {
     const result = await cloudinary.uploader.upload(filePath,{
        resource_type: resourceType,
     })
     fs.unlinkSync(filePath) //now remove file also from localPath
     return result
   } catch (error) {
     fs.unlinkSync(filePath)
     throw new CustomError(500,error.message)
   //   next(error) // cannot use here since we don't have acess here
    
   }
    
}