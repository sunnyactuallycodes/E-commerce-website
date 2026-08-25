import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';


dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

// Updated function - Now accepts buffer instead of local file path
const uploadOnCloudinary = async (buffer) => {
    try {
        if (!buffer) return null;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "your_app_folder", // Optional: organize your files
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            // Convert buffer to stream and upload
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });

    } catch (error) {
        console.error("Error while uploading to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };