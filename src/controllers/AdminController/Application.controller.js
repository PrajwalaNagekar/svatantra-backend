import Admission from '../../models/User/Admission.model.js';

export const allApplications = async (req, res) => {
    try {
        // Extract page and limit from query parameters (default to page 1 and 10 items per page)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        // Calculate how many documents to skip
        const skip = (page - 1) * limit;

        // Get total number of applications
        const total = await Admission.countDocuments();

        // Fetch paginated applications
        const applications = await Admission.find()
            .sort({ submittedAt: -1 }) // Sort by most recent
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: applications.length,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: applications,
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not fetch applications',
        });
    }
};

