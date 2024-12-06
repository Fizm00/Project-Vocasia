const Property = require("../models/Property");
const isOwner = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error Woy:" + error + error.message });
  }
};

module.exports = isOwner;
