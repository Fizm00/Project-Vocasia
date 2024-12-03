const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true untuk port 465, false untuk port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Tambahkan opsi debug
  logger: true, // Untuk melihat log pengiriman email
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Configuration Error: ", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

module.exports = transporter;
