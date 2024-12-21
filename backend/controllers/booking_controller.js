const Booking = require("../models/Booking");
const Property = require("../models/Property");
const midtransClient = require("midtrans-client");
require("dotenv").config();

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find({});

    res.status(200).json({
      status: "success | OK",
      message: "List Of Booking",
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.length === 0 || booking === null) {
      return res.status(404).json({
        status: "failed",
        message: "Booking Not Found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success | OK",
      message: "Booking By Id",
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const calculateTotalPrice = (propertyPrice, start_date, end_date) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((endDate - startDate) / oneDay);
  return propertyPrice * days;
};

const createBooking = async (req, res) => {
  try {
    const { user_id, property_id, start_date, end_date } = req.body;

    if (!user_id || !property_id || !start_date || !end_date) {
      return res.status(400).json({
        status: "failed",
        message: "Missing required fields , Please fill all fields",
        success: false,
      });
    }

    const property = await Property.findById(property_id);
    // cek stock property
    if (property.stock <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Stock is not available",
        success: false,
      });
    }

    // Cari property berdasarkan property_id
    if (!property) {
      return res.status(404).json({
        status: "failed",
        message: "Property Not Found",
        success: false,
      });
    }

    // Hitung total_price berdasarkan harga property
    const total_price = calculateTotalPrice(
      property.price,
      start_date,
      end_date
    );

    // Buat dokumen booking
    const [properties, booking] = await Promise.all([
      Property.findById(property_id),
      Booking.create({
        user_id,
        property_id,
        start_date,
        end_date,
        total_price,
        status: "pending", // Status awal pending
      }),
    ]);

    // Integrasi Midtrans
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
    const transactionParameter = {
      transaction_details: {
        order_id: "TRX-" + booking._id,
        gross_amount: total_price, // Total harga booking
      },

      customer_details: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
    };

    // Buat URL pembayaran melalui Midtrans
    const payment = await snap.createTransaction(transactionParameter);

    // Update booking dengan data pembayaran
    booking.payment = {
      status: "pending",
      transaction_id: payment.transaction_id, // Token dari Midtrans
      payment_method: payment.payment_type, // Metode pembayaran
      payment_date: new Date(), // Waktu pembayaran
      order_id: "TRX-" + booking._id,
      gross_amount: total_price,
      transaction_status: payment.transaction_status,
      fraud_status: payment.fraud_status,
    };
    await booking.save();

    console.log("Notification Headers:", req.headers);
    console.log("Notification Body:", req.body);

    // Response ke client
    res.status(201).json({
      status: "success | Created",
      message: "Booking Created Successfully",
      success: true,
      payment_url: payment.redirect_url, // URL untuk pembayaran
      payment_token: payment.token,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
    });
  }
};

const handleAfterBooking = async (req, res) => {
  try {
    const { order_id, transaction_status, fraud_status } = req.body;

    console.log(
      `Transaction notification received. Order ID: ${order_id}. Transaction status: ${transaction_status}. Fraud status: ${fraud_status}`
    );

    // Cari booking berdasarkan order_id
    const bookingId = order_id.split("TRX-")[1];

    // Ambil booking berdasarkan order_id
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "Booking Not Found",
        success: false,
      });
    }

    // Ambil properti yang dipesan
    const property = await Property.findById(booking.property_id);
    if (!property) {
      return res.status(404).json({
        status: "failed",
        message: "Property not found",
        success: false,
      });
    }

    // Logika berdasarkan transaction_status dan fraud_status
    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      if (property.stock <= 0) {
        return res.status(400).json({
          status: "failed",
          message: "Stock is unavailable, booking cannot be confirmed",
          success: false,
        });
      }
      // Kurangi stok properti dan simpan
      property.stock -= 1;
      await property.save();

      booking.status = "confirmed";
      booking.payment.status = "paid";
      if (transaction_status === "capture" && fraud_status === "challenge") {
        booking.status = "review";
        booking.payment.status = "pending";
      }
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      booking.status = "cancelled";
      booking.payment.status = "failed";
    } else if (transaction_status === "pending") {
      booking.status = "pending";
      booking.payment.status = "pending";
    }
    // Simpan perubahan di database
    await booking.save();

    console.log("Notification Headers:", req.headers);
    console.log("Notification Body:", req.body);

    res.status(200).json({
      status: "success | OK",
      message: "Notification Handled Successfully",
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getBooking,
  getBookingById,
  createBooking,
  handleAfterBooking,
};
