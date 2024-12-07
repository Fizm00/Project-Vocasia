const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    check_in_date: { type: Date }, // Tanggal check-in aktual
    check_out_date: { type: Date }, // Tanggal check-out aktual
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" }, // e.g., "pending", "confirmed", "cancelled"
    payment: {
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
      transaction_id: { type: String }, // ID dari Midtrans
      payment_method: { type: String }, // e.g., "bank_transfer", "credit_card"
      payment_date: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", function (next) {
  if (this.check_in_date && this.check_in_date < this.start_date) {
    return next(new Error("Check-in date cannot be earlier than start date."));
  }
  if (this.check_out_date && this.check_out_date < this.check_in_date) {
    return next(
      new Error("Check-out date cannot be earlier than check-in date.")
    );
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
