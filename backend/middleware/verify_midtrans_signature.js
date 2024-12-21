const crypto = require("crypto");
require("dotenv").config();

const verifyMidtransSignature = (req, res, next) => {
  const signatureKey = req.headers["x-callback-signature"];
  const body = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac("sha512", process.env.MIDTRANS_SERVER_KEY)
    .update(body)
    .digest("hex");

  if (signatureKey !== expectedSignature) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized: Invalid signature",
      success: false,
    });
  }
  next();
};

module.exports = verifyMidtransSignature;

// const crypto = require("crypto");
// require("dotenv").config();

// const verifyMidtransSignature = (req, res, next) => {
//   const { signature_key, order_id, status_code, gross_amount } = req.body;
//   const serverKey = process.env.MIDTRANS_SERVER_KEY;

//   const inputString = `${order_id}${status_code}${gross_amount}${serverKey}`;
//   const calculatedSignature = crypto
//     .createHash("sha512")
//     .update(inputString)
//     .digest("hex");

//   if (calculatedSignature !== signature_key) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Invalid Midtrans Signature",
//       success: false,
//     });
//   }

//   next();
// };

module.exports = verifyMidtransSignature;
