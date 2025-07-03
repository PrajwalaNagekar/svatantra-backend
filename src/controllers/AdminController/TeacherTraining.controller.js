import TeacherTraining from '../../models/User/TeacherTraining.model.js';

export const allTeacherApplications = async (req, res) => {
    try {
        const applications = await TeacherTraining.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Teacher training applications fetched successfully',
            applications,
        });
    } catch (error) {
        console.error('Error fetching teacher applications:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher applications',
            error: error.message,
        });
    }
};
