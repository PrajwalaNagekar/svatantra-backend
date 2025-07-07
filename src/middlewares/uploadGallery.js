// uploadGallery.js
import multer from 'multer';

const upload = multer();

// No CloudinaryStorage here — you'll use `.upload_stream()` manually in controller
export default upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 },
]);
