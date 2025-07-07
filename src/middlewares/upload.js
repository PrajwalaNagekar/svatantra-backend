import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gallery',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }],
    },
});

const upload = multer({ storage });

export default upload;



// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// // Storage for images
// const imageStorage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'gallery/images',
//         resource_type: 'image',
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//         transformation: [{ width: 800, height: 600, crop: 'limit' }],
//     },
// });

// // Storage for videos
// const videoStorage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'gallery/videos',
//         resource_type: 'video',
//         allowed_formats: ['mp4', 'mov', 'avi'],
//     },
// });

// // Create separate uploaders
// export const imageUpload = multer({ storage: imageStorage });
// export const videoUpload = multer({ storage: videoStorage });

// // Combined middleware (images + videos)
// export const mixedUpload = multer().fields([
//     { name: 'images', maxCount: 10 },
//     { name: 'videos', maxCount: 5 },
// ]);