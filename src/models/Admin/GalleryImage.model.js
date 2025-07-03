import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
