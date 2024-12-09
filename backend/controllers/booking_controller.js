const Booking = require("../models/Booking");
const Property = require("../models/Property");
const midtransClient = require("midtrans-client");
require("dotenv").config();

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find();

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

    // Cari property berdasarkan property_id
    const property = await Property.findById(property_id);
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
    const booking = await Booking.create({
      user_id,
      property_id,
      start_date,
      end_date,
      total_price,
      status: "pending", // Status awal pending
    });

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
      transaction_id: payment.token, // Token dari Midtrans
      payment_method: payment.payment_type,
      payment_date: payment.transaction_time,
    };
    await booking.save();

    // Response ke client
    res.status(201).json({
      status: "success | Created",
      message: "Booking Created Successfully",
      success: true,
      data: {
        booking,
        payment_url: payment.redirect_url, // URL untuk pembayaran
        payment_token: payment.token,
        payment_type: payment.payment_type,
        payment_status: payment.transaction_status,
        payment_date: payment.transaction_time,
        payment_amount: payment.gross_amount,
        payment_method: payment.payment_type,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
    });
  }
};

const handleMidtransNotification = async (req, res) => {
  try {
    // Konfigurasi Midtrans

    const coreApi = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Dapatkan body notifikasi dari Midtrans
    const notification = req.body;

    // log notofikasi
    console.log("Midtrans Notification Data:", notification);
    if (!notification.order_id) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid notification: Missing order_id",
        success: false,
      });
    }

    // Verifikasi notifikasi dari Midtrans
    const transactionStatus = notification.transaction_status;
    const orderId = notification.order_id;

    // Cari booking berdasarkan order_id
    const bookingId = orderId.split("TRX-")[1];
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "Booking Not Found",
        success: false,
      });
    }

    // Update status pembayaran berdasarkan status transaksi
    if (transactionStatus === "settlement") {
      booking.payment.status = "paid";
      booking.payment.payment_method = notification.payment_type; // Metode pembayaran
      booking.payment.payment_date = new Date(); // Waktu pembayaran
      booking.status = "confirmed"; // Ubah status booking
    } else if (transactionStatus === "expire") {
      booking.payment.status = "failed";
      booking.status = "cancelled";
    } else if (transactionStatus === "cancel") {
      booking.payment.status = "failed";
      booking.status = "cancelled";
    }

    // Simpan perubahan di database
    await booking.save();

    res.status(200).json({
      status: "success | OK",
      message: "Notification Handled Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed bro",
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getBooking,
  getBookingById,
  createBooking,
  handleMidtransNotification,
};
