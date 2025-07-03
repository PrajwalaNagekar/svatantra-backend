import Application from '../../models/User/Admission.model.js';
import TeacherApplication from '../../models/User/TeacherTraining.model.js';
import BookVisit from '../../models/User/BookAVisit.model.js';
import Enquiry from '../../models/User/Contact.model.js';
import Event from '../../models/Admin/Event.model.js';
import { GalleryImage } from '../../models/Admin/GalleryImage.model.js'
export const getDashboardCounts = async (req, res) => {
    try {
        const [
            applications,
            teacherApplications,
            visits,
            enquiries,
            events,
            galleryImages
        ] = await Promise.all([
            Application.countDocuments(),
            TeacherApplication.countDocuments(),
            BookVisit.countDocuments(),
            Enquiry.countDocuments(),
            Event.countDocuments(),
            GalleryImage.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            data: {
                applications,
                teacherApplications,
                visits,
                enquiries,
                events,
                galleryImages
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard counts'
        });
    }
};
