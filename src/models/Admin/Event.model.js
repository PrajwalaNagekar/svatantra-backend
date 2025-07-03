import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Event name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Event description is required'],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Event start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'Event end date is required'],
        },
        image: {
            type: String,
            required: [true, 'Event image URL is required'],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt fields
    }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
