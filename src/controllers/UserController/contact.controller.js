import Contact from '../../models/User/Contact.model.js';

export const contact = async (req, res) => {
    try {
        const { name, phone, email, comments } = req.body;

        if (!name || !phone || !email || !comments) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newContact = new Contact({ name, phone, email, comments });
        await newContact.save();

        return res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
