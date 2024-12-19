const User = require("../../models/User");

const adminRole = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    console.log("Admin Role Middleware|cek user: " + user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admins only." });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = adminRole;
