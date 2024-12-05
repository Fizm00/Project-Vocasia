const nodemailer = require("nodemailer");
const Email = require("../../models/Email_otp");

require("dotenv").config();

// Konfigurasi SMTP menggunakan Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Ganti dengan EMAIL_USER Anda
    pass: process.env.EMAIL_PASS, // Ganti dengan password aplikasi Gmail
  },
});

// Fungsi untuk mengirim EMAIL_USER
const send_email_otp = async (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Ganti dengan email Anda
    to,
    subject,
    text: message,
  };

  try {
    // Mengirim email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info);
    // Menyimpan log email ke MongoDB
    const emailLog = new Email({ to, subject, message });
    await emailLog.save();

    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass:", process.env.EMAIL_PASS);
    console.log("Request Body:", req.body);

    // Mengirim respons ke klien
    res.status(200).json({ message: "Email berhasil dikirim!", info });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengirim email", error });
    console.error("SendMail Error:", error);
  }
};

module.exports = { send_email_otp };
