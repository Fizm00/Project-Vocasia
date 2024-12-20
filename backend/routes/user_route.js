const express = require("express");
const user_controller = require("../controllers/user_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const adminRole = require("../middleware/admin/admin_role_middleware");
const authorizeRoles = require("../middleware/authorize_roles");

const router = express.Router();

router.get("/users", authenticateJWT, adminRole, user_controller.getuser);
router.get(
  "/user/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  user_controller.getuserbyid
);
router.post("/user", user_controller.createuser);
router.put("/user/:id", authenticateJWT, user_controller.updateuser);
router.delete(
  "/user/:id",
  authenticateJWT,
  adminRole,
  user_controller.deleteuser
);

module.exports = router;
