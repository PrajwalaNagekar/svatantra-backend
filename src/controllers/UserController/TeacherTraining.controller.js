import TeacherTraining from "../../models/User/TeacherTraining.model.js";
export const submitTrainingApplication = async (req, res) => {
    // return res.status(200).json({msg:"hi"})
    try {
        const { name, phone } = req.body;

        // Server-side validation (just in case frontend fails)
        if (!name || !phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: 'Invalid name or phone number' });
        }

        const newApplication = new TeacherTraining({ name, phone });
        await newApplication.save();

        return res.status(201).json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error saving teacher training form:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
