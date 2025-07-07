import { v2 as cloudinary } from 'cloudinary';
import Video from '../../models/Admin/videoSchema.js';

export const uploadVideos = async (req, res) => {
  try {
    const videos = req.files?.videos || [];
    const uploadedVideos = [];

    for (const file of videos) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'gallery/videos',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      const newVideo = new Video({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        title: file.originalname,
      });

      await newVideo.save();
      uploadedVideos.push(newVideo);
    }

    res.status(200).json({
      success: true,
      message: 'Videos uploaded successfully',
      data: uploadedVideos,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    await cloudinary.uploader.destroy(video.public_id, {
      resource_type: 'video',
    });

    await video.deleteOne();
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
