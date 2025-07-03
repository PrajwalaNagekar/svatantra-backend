import Event from '../../models/Admin/Event.model.js';
import cloudinary from '../../config/cloudinary.js';
import fs from 'fs';

export const addEvent = async (req, res) => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const imageFile = req.file;

        if (!name || !description || !startDate || !endDate || !imageFile) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'events',
        });

        const newEvent = new Event({
            name,
            description,
            startDate,
            endDate,
            image: result.secure_url,
            imagePublicId: result.public_id,
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event: newEvent,
        });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
export const fetchAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: 'Events fetched successfully',
            events,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, startDate, endDate } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, description, startDate, endDate },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent,
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Delete image from Cloudinary if public_id exists
        if (event.imagePublicId) {
            await cloudinary.uploader.destroy(event.imagePublicId);
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
