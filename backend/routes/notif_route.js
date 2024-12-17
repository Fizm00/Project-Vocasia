const express = require("express");
const { getAllNotifByUserId } = require("../controllers/notif/notification_controller");

const router = express.Router();

// Endpoint GET untuk mengambil notifikasi berdasarkan userId
router.get("/notifications/:userId", getAllNotifByUserId);

module.exports = router;
