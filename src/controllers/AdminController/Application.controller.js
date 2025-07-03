import Admission from '../../models/User/Admission.model.js';

export const allApplications = async (req, res) => {
    try {
        const applications = await Admission.find().sort({ submittedAt: -1 }); // Most recent first
        res.status(200).json({
            success: true,
            count: applications.length,
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
