import BookVisit from '../../models/User/BookAVisit.model.js'; // adjust the path if needed

export const allVisits = async (req, res) => {
    try {
        const visits = await BookVisit.find().sort({ createdAt: -1 }); // most recent first
        res.status(200).json({
            success: true,
            count: visits.length,
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
