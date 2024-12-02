const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Tambahkan opsi debug
  logger: true, // Untuk melihat log pengiriman email
});

module.exports = transporter;
