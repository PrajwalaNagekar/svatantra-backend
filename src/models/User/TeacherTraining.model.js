import mongoose from 'mongoose';

const teacherTrainingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const TeacherTraining = mongoose.model('TeacherTraining', teacherTrainingSchema);

export default TeacherTraining;
