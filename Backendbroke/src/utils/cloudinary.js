import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';  // For deleting temp files

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Check if the file exists before uploading
    if (!fs.existsSync(localFilePath)) {
      console.log(`File not found: ${localFilePath}`);
      return null;
    }

    // Upload the image
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // If the file has been uploaded successfully, delete the local file
    fs.unlinkSync(localFilePath);  // Delete from temp
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);  // Ensure temp file is removed on failure
    }
    return null;
  }
};

export { uploadOnCloudinary };
