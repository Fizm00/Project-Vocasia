const Notif = require("../../models/Notif"); // Pastikan path model sesuai

// Controller untuk mendapatkan semua notifikasi berdasarkan user_id
const getAllNotifByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validasi jika userId kosong
    if (!userId) {
      return res.status(400).json({ message: "User ID tidak boleh kosong" });
    }

    // Query untuk mengambil semua notifikasi berdasarkan user_id
    const notifications = await Notif.find({ user_id: userId });

    res.status(200).json({
        status: "success | OK",
        message: "Notifikasi berhasil diambil",
        success: true,
        data: notifications,
      });
  } catch (error) {
    // Tangani error
    console.error("Error saat mengambil notifikasi:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

module.exports = { getAllNotifByUserId };
