const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
