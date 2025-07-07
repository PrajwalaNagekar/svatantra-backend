import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // e.g., svatantramontessori@gmail.com
        pass: process.env.EMAIL_PASS  // App password from Gmail settings
    }
});
        console.log("🚀 ~  process.env.EMAIL_USER:",  process.env.EMAIL_USER)

/**e
 * Send an email
 * @param {Object} options
 * @param {string} options.to - Receiver email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 */
export const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: `"Svatantra Montessori" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};
