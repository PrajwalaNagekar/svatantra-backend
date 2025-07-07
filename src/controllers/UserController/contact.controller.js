import Contact from '../../models/User/Contact.model.js';
import { sendEmail } from '../../utils/sendEmail.js';

export const contact = async (req, res) => {
    try {
        const { name, phone, email, comments } = req.body;

        if (!name || !phone || !email || !comments) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Save to DB
        const newContact = new Contact({ name, phone, email, comments });
        await newContact.save();

        // Admin Email
        const adminHtml = `
            <h3>New Enquiry Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Comments:</strong> ${comments}</p>
        `;

        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: 'New Contact Form Submission',
            html: adminHtml,
        });
            console.log("🚀 ~ contact ~ process.env.EMAIL_USER:", process.env.EMAIL_USER)

        // User Thank You Email
        const userHtml = `
            <h3>Thank You for Contacting Us, ${name}!</h3>
            <p>We have received your message and will get back to you shortly.</p>
            <p><strong>Your Message:</strong></p>
            <blockquote>${comments}</blockquote>
            <br />
            <p>Warm regards,<br/>Svatantra Montessori</p>
        `;

        await sendEmail({
            to: email,
            subject: 'Thanks for Contacting Svatantra Montessori',
            html: userHtml,
        });

        return res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
