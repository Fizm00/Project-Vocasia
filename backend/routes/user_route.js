const express = require("express");
const user_controller = require("../controllers/user_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const adminRole = require("../middleware/admin/admin_role_middleware");

const router = express.Router();

router.get("/users", authenticateJWT, user_controller.getuser);
router.get("/user/:id", user_controller.getuserbyid);
router.post("/user", user_controller.createuser);
router.put("/user/:id", user_controller.updateuser);
router.delete("/user/:id", user_controller.deleteuser);

// router.post("/login", user_controller.loginUser);

module.exports = router;
