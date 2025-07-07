import cloudinary from '../../config/cloudinary.js';
import { GalleryImage } from '../../models/Admin/GalleryImage.model.js'
export const galleryUpload = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    console.log("🚀 ~ galleryUpload ~ uploadedFiles:", uploadedFiles)

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const imageDocs = [];

    for (const file of uploadedFiles) {
      const newImage = new GalleryImage({
        url: file.path,
        public_id: file.filename,
      });

      await newImage.save();
      imageDocs.push(newImage);
    }

    res.status(200).json({
      success: true,
      message: 'Images uploaded and saved to DB successfully',
      images: imageDocs,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// export const galleryUpload = async (req, res) => {
//   try {
//     const { images = [], videos = [] } = req.files;
//     const savedDocs = [];

//     // Upload images
//     for (const file of images) {
//       const result = await cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'image',
//           folder: 'gallery/images',
//           transformation: [{ width: 800, height: 600, crop: 'limit' }],
//         },
//         async (error, result) => {
//           if (error) throw error;
//           const doc = new GalleryImage({
//             url: result.secure_url,
//             public_id: result.public_id,
//             type: 'image',
//           });
//           await doc.save();
//           savedDocs.push(doc);
//         }
//       );
//       result.end(file.buffer);
//     }

//     // Upload videos
//     for (const file of videos) {
//       const result = await cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'video',
//           folder: 'gallery/videos',
//         },
//         async (error, result) => {
//           if (error) throw error;
//           const doc = new GalleryImage({
//             url: result.secure_url,
//             public_id: result.public_id,
//             type: 'video',
//           });
//           await doc.save();
//           savedDocs.push(doc);
//         }
//       );
//       result.end(file.buffer);
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Media uploaded and saved successfully',
//       data: savedDocs,
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch images' });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete from Cloudinary using public_id
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from MongoDB
    await GalleryImage.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
};

export const getGalleryImageById = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.status(200).json({ success: true, image });
  } catch (error) {
    console.error('Error fetching image by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch image' });
  }
}
