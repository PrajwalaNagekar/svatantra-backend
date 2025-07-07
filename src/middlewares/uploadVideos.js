import multer from 'multer';

const uploadVideos = multer({
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

export default uploadVideos.fields([{ name: 'videos', maxCount: 5 }]);