import BookVisit from '../../models/User/BookAVisit.model.js'; // adjust the path if needed

export const allVisits = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await BookVisit.countDocuments();

        const visits = await BookVisit.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: visits.length,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: visits,
        });
    } catch (error) {
        console.error('Error fetching visit bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error: Could not fetch visit bookings',
        });
    }
};

