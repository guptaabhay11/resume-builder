import { Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { AuthenticatedRequest } from '../../users/auth.middleware';
import userSchema from '../../users/user.schema';

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage });

export const uploadToCloudinary = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = req.file as Express.Multer.File;
      if (!file)  res.status(400).json({ success: false, message: 'No file provided' });
      
  
      const userId = req.auth?.id;
      if (!userId) {
         res.status(401).json({ success: false, message: 'User not authenticated' });
         return
      }
      if (file.mimetype !== 'application/pdf') {
         res.status(400).json({ success: false, message: 'Only PDF files are allowed' });
         return
      }
  
      // 1) upload to Cloudinary
     

       const uploadPdfToCloudinary = async (fileBuffer: Buffer, userId: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw', // raw for non-image files like PDFs
              folder: `resumeBuilder/${userId || 'temp'}`,
            },
            (error, result) => {
              if (error || !result) {
                console.error('Cloudinary upload error:', error);
                return reject(error || new Error('Upload failed'));
              }
              resolve(result.secure_url);
            }
          );
          uploadStream.end(fileBuffer);
        });
      };
      
  
      // 2) PUSH THE CLOUDINARY URL (not file.path)
      const updatedUser = await userSchema.findByIdAndUpdate(
        userId,
        { $push: { pdf: uploadPdfToCloudinary } },   // ← here!
        { new: true }
      ).select('-password');
  
      if (!updatedUser)  res.status(404).json({ success: false, message: 'User not found' }); return
  
       res.status(200).json({
        success: true,
        message: 'PDF uploaded to Cloudinary and user updated',
        data: updatedUser,
      });
      return
  
    } catch (error: any) {
      console.error(error);
       res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
       return
    }
  };