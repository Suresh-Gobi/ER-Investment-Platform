const nodemailer = require('nodemailer');

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendVerificationEmail = (email, otp) => {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: 'OTP Verification',
    html: `
      <div>
        <h1>OTP Verification</h1>
        <p>Your OTP code for email verification is: <strong>${otp}</strong></p>
        <p>Please use this OTP code to verify your email address.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendVerificationEmail };
