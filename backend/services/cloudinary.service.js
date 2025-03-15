import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'find_job_images',
      });
      return result.secure_url;
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary: ' + error.message);
    }
  };
  