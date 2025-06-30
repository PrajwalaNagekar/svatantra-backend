import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
    },
    fatherPhone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Father phone number must be 10 digits'],
    },
    motherName: {
        type: String,
        required: true,
        trim: true,
    },
    motherPhone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Mother phone number must be 10 digits'],
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
