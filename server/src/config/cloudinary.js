const multer = require("multer");
const { v2:cloudinary } = require("cloudinary")

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure Multer to store files in memory as Buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. Helper function to handle Cloudinary stream upload
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' }, // Optional folder name in Cloudinary
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

module.exports = { uploadToCloudinary };