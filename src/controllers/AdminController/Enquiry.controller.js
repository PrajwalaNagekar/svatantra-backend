import Contact from '../../models/User/Contact.model.js'; // adjust the path if needed

export const allEnquiries = async (req, res) => {
    try {
        const enquiries = await Contact.find().sort({ createdAt: -1 }); // most recent first
        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries,
        });
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not fetch enquiries',
        });
    }
};
