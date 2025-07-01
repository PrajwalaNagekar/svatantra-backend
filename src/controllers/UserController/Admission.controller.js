import Admission from '../../models/User/Admission.model.js';

export const admission = async (req, res) => {
    try {
        const {
            studentName,
            dob,
            fatherName,
            fatherPhone,
            motherName,
            motherPhone,
            address,
        } = req.body;

        const newAdmission = new Admission({
            studentName,
            dob,
            fatherName,
            fatherPhone,
            motherName,
            motherPhone,
            address,
        });
        console.log("🚀 ~ admission ~ newAdmission:", newAdmission)

        await newAdmission.save();

        return res.status(201).json({
            success: true,
            message: 'Admission form submitted successfully',
            data: newAdmission,
        });
    } catch (error) {
        console.error('Admission submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server Error. Please try again later.',
        });
    }
};