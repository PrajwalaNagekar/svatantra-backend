// models/BookVisit.js

import mongoose from 'mongoose';

const bookVisitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('BookVisit', bookVisitSchema);
