const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // UPDATING TO CORRECT EMAIL - nitinkumar79005205@gmail.com
    const user = process.env.EMAIL_USER || 'nitinkumar79005205@gmail.com';
    const pass = process.env.EMAIL_PASS || 'ccri zdhp wtiq ciqb';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    try {
        await transporter.verify();
        console.log("Transporter verified and ready to send");
        
        const mailOptions = {
            from: `"Acharya Ji Online" <${user}>`,
            to: options.email,
            subject: options.subject,
            html: options.message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to: ", options.email);
        return info;
    } catch (err) {
        console.error("EMAIL AUTH ERROR:", err.message);
        throw err;
    }
};

module.exports = sendEmail;
