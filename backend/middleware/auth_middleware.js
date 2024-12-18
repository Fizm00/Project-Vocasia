const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token Invalid",
    });
  }
};
