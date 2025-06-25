const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter with Gmail SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: `"School Management System" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail; 