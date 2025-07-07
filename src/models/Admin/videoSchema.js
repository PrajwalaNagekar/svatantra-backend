import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
export default Video;
