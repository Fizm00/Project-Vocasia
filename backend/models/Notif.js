const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Notif = mongoose.model("Notif", notifSchema);

module.exports = Notif;
