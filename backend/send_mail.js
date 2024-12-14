const transporter = require("./config/email");

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "artiasifotri@gmail.com",
  subject: "Test Email",
  text: "This is a test email from Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});

// test untuk upload ke github <==================
