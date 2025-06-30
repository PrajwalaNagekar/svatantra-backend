import BookVisit from '../../models/User/BookAVisit.model.js';

export const BookAVisit = async (req, res) => {
    try {
        const { name, mobile, date, time } = req.body;

        // Basic validation (no Joi)
        if (!name || !mobile || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: "Mobile number must be 10 digits only" });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Create & save the booking
        const newBooking = new BookVisit({
            name,
            mobile,
            date: parsedDate,
            time,
        });

        await newBooking.save();

        return res.status(201).json({
            message: "Visit booked successfully!",
            data: newBooking,
        });

    } catch (error) {
        console.error("Error in BookAVisit:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
