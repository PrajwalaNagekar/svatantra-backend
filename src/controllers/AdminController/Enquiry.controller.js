import Contact from '../../models/User/Contact.model.js'; // adjust the path if needed

export const allEnquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Contact.countDocuments();

        const enquiries = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: enquiries.length,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
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

